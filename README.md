Set up webpack steps to the project:

- ```npm i webpack --save-dev # or just -D if you want to save typing```

#### Basic set up

- create basic project structure

```

├── app                     
|    ├── index.js    
|    ├── component.js            
|                 
├── build               #transformed app as bundle goes here             
|                          
└── package.json                    
|                          
└── webpack.config.js
```

- generate index.html using plugin ```npm i html-webpack-plugin --save-dev```
- update package.json in scripts : ``` "build": "webpack"```
- run webpack ```npm run build```
- webpack.config.js (basic): [Basic set up](https://github.com/heron2014/webpack-setup/issues/1)

#### Spliting the configuration

- ```npm i webpack-merge --save-dev```
- define some split points to our configuration so we can customize it per npm script
- integrate a tool known as ```webpack-validator``` to the project, it will validate the configuration against a schema and warn if we are trying to do something not sensible: ```npm i webpack-validator --save-dev```
- add to the file:
```js

const validate = require('webpack-validator');

//instead of module.exports = config;
module.exports = validate(config);
```
- if you break your webpack the validation will give you a nice error message

- this set up is for small/medium projects: [upgraded set up](https://github.com/heron2014/webpack-setup/issues/2)

#### Add Hot Module Replacement for automatic browser refresh

-```webpack-dev-server``` is a development server running in-memory. It refreshes content automatically in the browser while you develop your application. It also supports an advanced Webpack feature known as ```Hot Module Replacement```
- **Note**: You should use webpack-dev-server strictly for development. If you want to host your application, consider other standard solutions, such as Apache or Nginx.

- ```npm i webpack-dev-server --save-dev```
- update package.json:
```js
"scripts": {

  "start": "webpack-dev-server",

  "build": "webpack"
},

```
- execute ```npm run start``` or ```npm start```
- at the top of the execution, you can see that our webpack-server is runnig on ```http://localhost:8080/``` , navigate there
- add hot reload/refresh, we could use ```webpack-dev-server --inline --hot``` but next we will configure the proper way
- create ```libs/parts.js``` where we do configuration there, this keeps our webpack.config.js simple and promotes reuse and paste the code from here [HMR](https://github.com/heron2014/webpack-setup/issues/3)
- update the ```webpack.config.js``` file to serve lib/parts.js by adding:
```js
//require the lib/parts :const parts = require('./libs/parts');
//in switch statement in default case: instead of config = merge(common, {});
config = merge(
  common,
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT
  })
);
```

- Execute ```npm start``` and surf to ```localhost:8080```. Try modifying app/component.js. It should refresh the browser.
- you can also type: ```http://localhost:8080/webpack-dev-server/``` in the browser and it will give you the app state info
- if you encounter issue, check this approach: [here](http://survivejs.com/webpack/developing-with-webpack/automatic-browser-refresh/#hmr-on-windows-ubuntu-and-vagrant)

#### Refreshing CSS
- ```npm i css-loader style-loader --save-dev```
- update libs/parts to inslude this:
```js
exports.setupCSS = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: paths
        }
      ]
    }
  };
}
```
- update ```webpack.config.js``` in switch statement (case build and default) to include:
```js
//build
config = merge(
  common,
  parts.setupCSS(PATHS.app)
);
//and in deafult after common:
parts.setupCSS(PATHS.app),
```

## Minification, bundle splitting, and caching (advanced)

- ```npm i react --save```
- check what is the size of the app by running ```npm run build```

###### Minifying the Code - http://survivejs.com/webpack/building-with-webpack/minifying-build/#minifying-the-code
- add to lib/parts:
```js
exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
}

```
- update webpack.config.js in case build add after common: ```parts.minify(),
```
- run ```npm run build``` and check the size again - it should much much smaller
- reference to configure uglify - http://survivejs.com/webpack/building-with-webpack/minifying-build/#controlling-uglifyjs-through-webpack
- setting up env variables see here http://survivejs.com/webpack/building-with-webpack/setting-environment-variables/#setting-process-env-node_env-


## Configuring React

- ```npm i babel-loader babel-core --save-dev```
- if you want to use  ```import Button from './Button';``` add this code to your webpack.config.js
```js
const common = {
  ...
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
```
- add as well module object
- ```npm i babel-preset-es2015 babel-preset-react --save-dev```
- create new file .babelrc.
- http://survivejs.com/webpack/advanced-techniques/configuring-react/#setting-up-babel-preset-react-hmre-
- ```npm i babel-preset-react-hmre --save-dev```
- update webpack.config.js with :
```js
const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;

```
- update .bablerc , add env object:
```js
"env": {
    "start": {
      "presets": [
        "react-hmre"
      ]
    }
  }
```

### Examples of basic REact webpack.config.js https://github.com/heron2014/webpack-setup/issues/4
#### Reference
- https://webpack.github.io/docs/list-of-tutorials.html
- http://survivejs.com/
- https://github.com/webpack/react-starter/blob/master/make-webpack-config.js
- https://github.com/webpack
- [Alternative Ways to Use webpack-dev-server](http://survivejs.com/webpack/developing-with-webpack/automatic-browser-refresh/#alternative-ways-to-use-webpack-dev-server-)
- [Enabling Sourcemaps During Development](http://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/#enabling-sourcemaps-during-development)
- [DefinePlugin](http://survivejs.com/webpack/building-with-webpack/setting-environment-variables/#the-basic-idea-of-defineplugin-)
