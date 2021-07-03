import './sass/main.scss';
import  PhotosApiService from './js/apiService';
import itemsTpl from './templates/gallery.hbs'
import LoadMoreBtn from './js/more-btn';
const ImageService = new PhotosApiService();
const LoadMoreButton = new LoadMoreBtn({
  selector: '.btn',
  hidden: true,
});

const refs = {
 form: document.querySelector('#search-form'),
 list: document.querySelector('.gallery'),
btn: document.querySelector('.btn'),

}


refs.btn.addEventListener('click', fetchItems)
refs.form.addEventListener('submit', onSearchImage)


function onSearchImage(event){
  event.preventDefault();

  clearGalleryList()
  ImageService.value = event.currentTarget.elements.query.value

  if(ImageService.value === ''){
    LoadMoreButton.disable()
  }
  LoadMoreButton.show();
  ImageService.resetPage();
  fetchItems();
}
 

function clearGalleryList() {
  refs.list.innerHTML = '';
}
function fetchItems() {
  LoadMoreButton.disable();
  return ImageService.fetchImages().then(images => {
    appendItemsMarkup(images);

    LoadMoreButton.enable();

    // if (images.length === 0) {
    //   LoadMoreButton.hide();
    // }
  });
}

function appendItemsMarkup(image){
  refs.list.insertAdjacentHTML('beforeend', itemsTpl(image))
}