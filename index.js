const search = require('./searches/film');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  triggers: {},

  searches: {
    [search.key]: search,
  },

  creates: {},

  resources: {},
};
