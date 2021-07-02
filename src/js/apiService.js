const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const KEY = '22313175-89def84c9551dc3c20db3bc15'

export default function fetchApi(value){
    return fetch(`${BASE_URL}&q=${value}&page=1&per_page=12&key=${KEY}`)
}