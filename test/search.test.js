require('should');

const util = require('util');
const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('ID Lookup', () => {
  testID('238');
  testID('tt0068646');
  testID('tt0095467');
  testID('tt1664794');
});

function testID(id) {
  it('should search for ' + id, (done) => {
    const bundle = {
      inputData: {
        id: id,
        api_key: '{{process.env.API_KEY}}',
      }
    };

    appTester(App.searches.film.operation.perform, bundle)
      .then(results => {
        should(results.length).equal(1);

        console.log(util.inspect(results, {
          breakLength: Infinity,
          depth: Infinity,
          showHidden: true,
          colors: true,
          compact: false,
        }));

        done();
      })
      .catch(done);
  });
}
