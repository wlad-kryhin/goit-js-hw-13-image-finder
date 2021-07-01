import './sass/main.scss';
import fetchApi from './js/apiService';

const refs = {
 form: document.querySelector('#search-form'),
 list: document.querySelector('.gallery'),
btn: document.querySelector('.load-more-btn'),

}


refs.list.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});

fetchApi().then(img=> console.log(img))

refs.form.addEventListener('submit', (e) =>{
    e.preventDefault(   )

})