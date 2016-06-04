[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# dnit

## Initialization

* Initialize the project for the first time with `npm run init`

## Launch

* To launch it once it has been initialized simply use `npm start`

## Build

* Simple build with `npm run build`

* Concatenated build with `npm run release`

## Query string parameters

* `dev` to launch the development version from `src` folder

  If not specified it will try to load the bundled `index.js` file from the `build` folder and fallback to `src` if it can't find it.

NB: As Safari doesn't completely support ES6 atm, if you're targetting it, "es2015" needs to be set to true in jspm.config.js
