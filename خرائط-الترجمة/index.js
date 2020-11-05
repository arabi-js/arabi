const windowMap = require('./window.tmap');
const jqueryMap = require('./jquery.tmap');

module.exports = {
  global: windowMap,
  modules: [
    jqueryMap,
  ],
}
