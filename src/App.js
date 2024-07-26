import { useEffect, useState } from "react";
import { Navbar, Logo, Search, NumResults } from "./components/Navbar";
import { MovieDetails } from "./components/MovieDetails";
import { Loader } from "./components/utils/Loader";
import { Error } from "./components/utils/Error";
import {
  Main,
  Box,
  MovieList,
  WatchedSummary,
  WatchedMovieList,
} from "./components/Main";

function App() {
  const [movies, setMovies] = useState([]); //
  const [watched, setWatched] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("salaar");
  const [selectedId, setSelectedId] = useState("");

  //handle Selected Movie
  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  //handling movies that we add to watchlist
  function handleWatchedMovies(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  //used for fetching movies from OMDB Api on MovieList component
  useEffect(
    function () {
      async function handleDataFetching() {
        try {
          setLoading(true); //used for enabling </Loader>
          setError(""); 
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      //while searching if search input length is less<3
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      handleDataFetching();
    },
    [query]
  );

  return (
    <>
      <Navbar movies={movies}>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        {/* Box1 - list of searched movies */}
        <Box>
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}

          {isLoading && <Loader />}
          {error && <Error message={error} />}
        </Box>

        {/* Box2 - list of watched movies and summary */}
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseBtn={(id) => setSelectedId(null)}
              onAddWatched={handleWatchedMovies}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
