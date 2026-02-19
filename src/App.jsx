import Nav from './components/Nav';
import Banner from './components/Banner';
import Row from './components/Row';
import { requests } from './api/tmdb';

function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Nav />
      <Banner />

      {/* Movie Rows */}
      <main className="relative z-10 -mt-16 md:-mt-24 pb-20">
        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchAction} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedy} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorror} />
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
            by TMDB.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
