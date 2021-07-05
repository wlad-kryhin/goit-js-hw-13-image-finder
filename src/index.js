import './sass/main.scss';
import { error } from '../node_modules/@pnotify/core';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import '../node_modules/@pnotify/core/dist/PNotify.css';
import modalOpen from './js/modal'
import cardMarkup from './templates/gallery.hbs';
import ImageApiService from './js/apiService';
import LoadMoreBtn from './js/more-btn';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  modal : document.querySelector('.modal')
};


const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imageApiService = new ImageApiService();
refs.gallery.addEventListener('click', modalOpen)
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchCards);
refs.modal.addEventListener('click', e =>{ if(e.target.classList.contains('modal')){
  return  refs.modal.classList.remove('is-open')
}
})
function onSearch(e) {
  e.preventDefault();

  clearGalleryContainer();
  imageApiService.query = e.currentTarget.elements.query.value;

  if (imageApiService.query === '') {
loadMoreBtn.disable();
     enterSmth()
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
function  noMatchesFound() {
error({
  text: 'No matches found. Please enter another query!',
  delay: 1500 
})
}
function enterSmth(){
  error({
    text: ' Please, enter something :=) ',
    delay: 2000
  })
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