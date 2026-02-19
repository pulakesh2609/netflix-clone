import axios from 'axios';

const API_KEY = '508012b325a76b621e9805612b22df16';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: API_KEY,
        language: 'en-US',
    },
});

export const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';
export const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

export const requests = {
    fetchNetflixOriginals: '/discover/tv?with_networks=213',
    fetchTrending: '/trending/all/week',
    fetchTopRated: '/movie/top_rated',
    fetchAction: '/discover/movie?with_genres=28',
    fetchComedy: '/discover/movie?with_genres=35',
    fetchHorror: '/discover/movie?with_genres=27',
};

export default instance;
