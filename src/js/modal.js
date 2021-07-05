export default function modalOpenCards(e){
    e.preventDefault()
 if (e.target.nodeName !== "IMG"){
     return
}
const modal = document.querySelector('.modal')
modal.classList.add('is-open')
const imgModal = document.querySelector('.modal-img')
imgModal.src = e.target.dataset.source
}