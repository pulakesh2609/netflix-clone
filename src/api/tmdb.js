import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.tvmaze.com',
});

// Helper to strip HTML tags from TVMaze summaries
export function stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
}

// Fetch shows from multiple pages and return combined array
async function fetchAllShows() {
    try {
        const pages = [0, 1, 2, 3];
        const responses = await Promise.all(
            pages.map((page) => instance.get(`/shows?page=${page}`))
        );
        return responses.flatMap((res) => res.data);
    } catch (error) {
        console.error('Failed to fetch shows:', error);
        return [];
    }
}

// Cache so we don't refetch on every row
let showsCache = null;
async function getShows() {
    if (!showsCache) {
        showsCache = fetchAllShows();
    }
    return showsCache;
}

// Filter shows by genre and sort by rating
function filterByGenre(shows, genre) {
    return shows
        .filter(
            (show) =>
                show.genres?.includes(genre) &&
                show.image?.medium &&
                show.rating?.average
        )
        .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0))
        .slice(0, 20);
}

// Get shows with high ratings for the banner
function getTopShows(shows) {
    return shows
        .filter(
            (show) =>
                show.image?.original &&
                show.rating?.average >= 8 &&
                show.summary
        )
        .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0))
        .slice(0, 15);
}

// Exported fetch functions for each category
export const fetchByGenre = async (genre) => {
    const shows = await getShows();
    return filterByGenre(shows, genre);
};

export const fetchTopRated = async () => {
    const shows = await getShows();
    return shows
        .filter((show) => show.image?.medium && show.rating?.average)
        .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0))
        .slice(0, 20);
};

export const fetchBannerShow = async () => {
    const shows = await getShows();
    const topShows = getTopShows(shows);
    if (topShows.length === 0) return null;
    return topShows[Math.floor(Math.random() * topShows.length)];
};

export const fetchTrending = async () => {
    const shows = await getShows();
    return shows
        .filter(
            (show) =>
                show.image?.medium &&
                show.rating?.average &&
                show.status === 'Running'
        )
        .sort((a, b) => (b.weight || 0) - (a.weight || 0))
        .slice(0, 20);
};

export default instance;
