const tags = require('language-tags');

module.exports = {
  key: 'film',
  noun: 'Film',
  display: {
    label: 'Find a film',
    description: 'Search for film by ID.'
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        type: 'string',
        label: 'ID',
        helpText: 'ID to search for.'
      },
      {
        key: 'api_key',
        type: 'string',
        label: 'API Key',
        helpText: 'TMDB API v3 key.'
      }
    ],
    perform: (z, bundle) => {
      const url = 'https://api.themoviedb.org/3/movie/' + bundle.inputData.id + '?api_key=' + bundle.inputData.api_key;

      const options = {
      };

      return z.request(url, options).then((response) => {
        const result = JSON.parse(response.content);

        const film = result;
        if (film.original_language) film.original_language = tags.language(film.original_language).descriptions()[0];
        if (film.genres) film.genres = film.genres.map((el) => el.name).join(', ');
        if (film.poster_path) film.poster_path = 'https://image.tmdb.org/t/p/w500/' + film.poster_path;
        return [film];
      });
    },
  }
};
