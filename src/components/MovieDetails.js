import { useEffect, useState } from "react";
import StarRating from "./utils/StarRating";
import { Loader } from "./utils/Loader";

//MovieDetails Component:
export function MovieDetails({ selectedId, onCloseBtn, onAddWatched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(false);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbRating,
  } = movie;

  // console.log(movie);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
    };
    onAddWatched(newWatchedMovie);
    onCloseBtn(null); // Close the details view after adding to watched list
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        console.log(data);
        setLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="details">
          <header>
            <button className="btn-back" onClick={() => onCloseBtn(null)}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${poster} movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB ratig
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxRating={10} size={24} onSet />
              <button className="btn-add" onClick={handleAdd}>
                Add to List
              </button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}
