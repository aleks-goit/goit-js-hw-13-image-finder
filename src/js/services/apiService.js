const baseUrl =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';

export default {
  API_KEY: '16237149-31f8128048fb3bf9af47cfac8',
  page: 1,
  query: '',
  fetchImages() {
    const options = {
      headers: {
        Accept: 'application/json',
      },
    };
    const requestParams = `q=${this.query}&page=${this.page}&per_page=12&key=${this.API_KEY}`;

    return fetch(baseUrl + requestParams, options)
      .then(response => {
        return response.json();
      })
      .then(parsedResponse => {
        this.incrementPage();
        return parsedResponse.hits;
      })
      .catch(error => {
        throw error;
      });
  },
  incrementPage() {
    this.page += 1;
  },
  set searchQuery(string) {
    this.query = string;
  },
  resetPage() {
    this.page = 1;
  },
};
