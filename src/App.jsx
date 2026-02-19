import Nav from './components/Nav';
import Banner from './components/Banner';
import Row from './components/Row';
import { fetchByGenre, fetchTopRated, fetchTrending } from './api/tmdb';

function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Nav />
      <Banner />

      {/* Show Rows */}
      <main className="relative z-10 -mt-16 md:-mt-24 pb-20">
        <Row
          title="TRENDING NOW"
          fetchShows={fetchTrending}
          isLargeRow
        />
        <Row title="Top Rated" fetchShows={fetchTopRated} />
        <Row title="Drama" fetchShows={() => fetchByGenre('Drama')} />
        <Row title="Comedy" fetchShows={() => fetchByGenre('Comedy')} />
        <Row title="Thriller" fetchShows={() => fetchByGenre('Thriller')} />
        <Row title="Science-Fiction" fetchShows={() => fetchByGenre('Science-Fiction')} />
        <Row title="Crime" fetchShows={() => fetchByGenre('Crime')} />
        <Row title="Horror" fetchShows={() => fetchByGenre('Horror')} />
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-extrabold mb-2">
            <span className="text-red-600">GLASS</span>
            <span className="text-white">FLIX</span>
          </h3>
          <p className="text-gray-500 text-xs">
            This is a demo project. Not affiliated with Netflix. Data provided
            by TVMaze.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
