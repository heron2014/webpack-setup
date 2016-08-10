There are multiple ways to set up webpack (WIP)

- ```npm i webpack --save-dev # or just -D if you want to save typing```

- webpack.config.js expects object with following properties:
  - entry (path to starting point of the application, example app/index.js where you render your components)
  - output (compiled files)
  - module
  - plugins

#### Basic development set up

- basic project structure

```

├── src                     
|    ├── index.js       #starting point
|    ├── component.js            
|                 
├── public                           
|    ├── index.html    
|    ├── bundle.js       #transformed app as bundle goes here                  
└── package.json                    
|                          
└── webpack.config.js
```


- ```npm install react --save // you can install specific version like react@0.14.3```
- ```npm install react-dom --save // you can install specific version like react-dom@0.14.3```

- ```npm install --save-dev babel-loader babel-core babel-preset-es2015 babel-preset-react```
- ```npm install webpack webpack-dev-server --save-dev```
- create webpack.config.js file and paste the code below
- create .babelrc file and add presets:

```js
{
  "presets": ["react", "es2015"]
}

```

In package.json:

```js
"scripts": {
  "start": "webpack-dev-server",
  "build": "webpack --progress --colors",
```

Example of basic configuration (webpack.config.js):

```js
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  devServer: {
    contentBase: './public',
    inline: true,//for hot reloading
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
};
```
#### dev tools
#### Modules - css, images, files etc... (wip)
#### Minifying (wip)
#### Splitting configuration (production versus developmnt)
#### dev server


#### Reference
- https://webpack.github.io/docs/list-of-tutorials.html
- http://survivejs.com/
- https://github.com/webpack/react-starter/blob/master/make-webpack-config.js
- https://github.com/webpack
- [Alternative Ways to Use webpack-dev-server](http://survivejs.com/webpack/developing-with-webpack/automatic-browser-refresh/#alternative-ways-to-use-webpack-dev-server-)
- [Enabling Sourcemaps During Development](http://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/#enabling-sourcemaps-during-development)
- [DefinePlugin](http://survivejs.com/webpack/building-with-webpack/setting-environment-variables/#the-basic-idea-of-defineplugin-)
- [Set up webpack article](http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup)
- [react kickstarter](https://github.com/vesparny/react-kickstart)
