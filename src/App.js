import React,{Fragment} from 'react';
import MovieList from './components/MovieList';
import './App.css';
import { useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch('https://swapi.dev/api/film/');
      if(!response.ok) {
        throw new Error('Something went wrong ....Retrying');
      }
      const data = await response.json();
      
    
      const transformedMovies = data.results.map(movieData=> {
        return{
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date

        };

      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false); 
  }
  let content = <p>Found no movie.</p>;
  if(movies.length>0){
    content=<MovieList movies={movies}/>
  }
  if(error){
    content = <p>{error}</p>
  }
  if(isLoading){
    content= <p>Loading....</p>
  }
  return (
    <Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </Fragment>
    
  );
}

export default App;
