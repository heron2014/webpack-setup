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
- webpack.config.js (basic):

```js
'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo'
    })
  ]
};
```

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

- this set up is for small/medium projects:

```js
'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');

const validate = require('webpack-validator');


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};


const common = {

  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack setup'
    })
  ]
};


var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {});
    break;
  default:
    config = merge(common, {});
}

module.exports = validate(config);
```

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
- create ```libs/parts.js``` where we do configuration there, this keeps our webpack.config.js simple and promotes reuse.

#### Reference
- https://webpack.github.io/docs/list-of-tutorials.html
- http://survivejs.com/
- https://github.com/webpack/react-starter/blob/master/make-webpack-config.js
- https://github.com/webpack
