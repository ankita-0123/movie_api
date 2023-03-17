import React,{Fragment} from 'react';
import MovieList from './components/MovieList';
import './App.css';
import { useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films/').then(response=>{
      return response.json();
    }).then(data=>{
      const transformedMovies = data.results.map(movieData=> {
        return{
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date

        };

      });
      setMovies(transformedMovies);
    });
  }
  return (
    <Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MovieList movies={movies}/>
      </section>
    </Fragment>
    
  );
}

export default App;
