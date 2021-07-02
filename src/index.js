import './sass/main.scss';
import fetchApi from './js/apiService';
import itemsTpl from './templates/gallery.hbs'

const refs = {
 form: document.querySelector('#search-form'),
 list: document.querySelector('.gallery'),
btn: document.querySelector('.load-more-btn'),

}


refs.list.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});


refs.form.addEventListener('submit', (e) =>{
    e.preventDefault()
    const inputValue = e.target.elements.query.value
 fetchApi(inputValue).then(r => r.json()).then(image=> appendItemsMarkup(image)).catch(error => console.log(error))
})

function appendItemsMarkup(image){
    refs.list.insertAdjacentHTML('beforeend', itemsTpl(image))
}