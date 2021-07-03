const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const KEY = '22313175-89def84c9551dc3c20db3bc15'

export default class PhotosApiService {
    constructor(){ 
        this.searchValue = ' ';
        this.page = 1;
    }

    async fetchImages(){
        const searchUrl = await fetch(`${BASE_URL}&q=${this.searchValue}&page=${this.page}&per_page=12&key=${KEY}`)
        const {list : images } = await searchUrl.json();
        this.incrementPage()
        return images 
    }

    incrementPage(){
        this.page += 1
    }

    resetPage(){
        this.page = 1
    }

    get value(){
        return this.searchValue 
    }

    set value(newValue){
    this.searchValue = newValue
    }
}