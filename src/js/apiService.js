
const BASE_URL = 'https://pixabay.com/api';
const KEY = '22313175-89def84c9551dc3c20db3bc15';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImage() {
    const responseUrl = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`,
    );

    const { hits } = await responseUrl.json();
    this.incrementPage();
    console.log(hits);

    return hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}