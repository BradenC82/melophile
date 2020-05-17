const functions = require('firebase-functions');
const axios = require('axios');
const querystring = require('querystring');
const cookieParser = require('cookie-parser')();

const client_id = functions.config().spotify.id;
const client_secret = functions.config().spotify.key
const redirect_uri = 'https://us-central1-melophile-d7325.cloudfunctions.net/callback';

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

exports.login = functions.https.onRequest((request, response) => {

    var state = generateRandomString(16);
    response.cookie(stateKey, state);

    //Requests authorization
    let scope = 'user-read-private user-read-email user-library-read streaming user-read-playback-state';
    response.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

exports.callback = functions.https.onRequest((request, response) => {
    cookieParser(request, response, () => {

        let code = request.query.code || null
        let state = request.query.state || null;
        let storedState = request.cookies ? request.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            response.redirect('http:localhost:3000?' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {

            let authOptions = {
                method: 'post',
                url: 'https://accounts.spotify.com/api/token',
                data: querystring.stringify({ // in axios data is the body request
                    grant_type: 'authorization_code',
                    code:code, // code received from https://accounts.spotify.com/authorize
                    redirect_uri:redirect_uri
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
                }
            }

            axios(authOptions)
                .then(res => {
                    let access_token = res.data.access_token;
                    let refresh_token = res.data.refresh_token;
                    console.log(res);
                    response.redirect('http:localhost:3000/dashboard?' + querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
                    return null
                })
                .catch(err => {
                    console.log(err)
                    response.redirect('http:localhost:3000?' +
                        querystring.stringify({
                            error: 'access_denied'
                        }));
                    return err
                });

        }

    })
});




// TODO: Send refresh_token from client and receive updated access_token
exports.refresh = functions.https.onRequest((request, response) => {
    let refresh_token = request.query.refreshToken || null

    let authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({ // in axios data is the body request
            grant_type: 'refresh_token',
            refresh_token, // code I'm receiving from https://accounts.spotify.com/authorize
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${functions.config().spotify.id}:${functions.config().spotify.key}`).toString('base64') // client id and secret from env
        }
    }

    axios(authOptions)
        .then(res => {
            response.send(res)
            return res
        })
        .catch(err => {
            return err
        });
})

