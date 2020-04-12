const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
        process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')({
            content:[
                './src/App.js',
                './src/index.js',
                './src/**/*.jsx'
            ],
            defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        })
    ],
};