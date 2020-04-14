const functions = require('firebase-functions');
const axios = require('axios');
const querystring = require('querystring');

const redirect_uri = 'https://us-central1-melophile-d7325.cloudfunctions.net/callback';

exports.login = functions.https.onRequest((request, response) => {
    let my_client_id = functions.config().spotify.id;
    let scopes = 'user-read-private user-read-email';

    response.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + my_client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri))
});

exports.callback = functions.https.onRequest((request, response) => {
    let code = request.query.code || null
    let authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({ // in axios data is the body request
            grant_type: 'authorization_code',
            code, // code I'm receiving from https://accounts.spotify.com/authorize
            redirect_uri
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${functions.config().spotify.id}:${functions.config().spotify.key}`).toString('base64') // client id and secret from env
        }
    }


    axios(authOptions)
        .then(res => {
            response.redirect('http:localhost:3000/dashboard' + '?access_token=' + res.data.access_token)
            return res
        })
        .catch(err => {
            response.redirect('http:localhost:3000/login' + '?error=access_denied')
            return err
        });

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

