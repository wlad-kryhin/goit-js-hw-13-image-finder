import './sass/main.scss';

import cardMarkup from './templates/gallery.hbs';
import ImageApiService from './js/apiService';
import LoadMoreBtn from './js/more-btn';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchCards);

function onSearch(e) {
  e.preventDefault();

  clearGalleryContainer();
  imageApiService.query = e.currentTarget.elements.query.value;

  if (imageApiService.query === '') {
return loadMoreBtn.disable();
  }

  loadMoreBtn.show();
  imageApiService.resetPage();
  fetchCards();
}

function fetchCards() {
  loadMoreBtn.disable();
  return imageApiService.fetchImage().then(cards => {
    renderMarkup(cards);

    scrollPage();
    loadMoreBtn.enable();

    if (cards.length === 0) {
      loadMoreBtn.hide();
      noMatchesFound();
    }
  });
}


function renderMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cardMarkup(hits));
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}

function scrollPage() {
  try {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}