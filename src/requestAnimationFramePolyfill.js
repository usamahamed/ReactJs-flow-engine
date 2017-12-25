// Since React16.0 relies on requestAnimationFrame we need to polyfill it
// for the test environment at least (modern browsers will have it by default)
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582

global.requestAnimationFrame = (callback) => { setTimeout(callback, 0); };
