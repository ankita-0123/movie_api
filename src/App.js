import React,{Fragment, useEffect, useCallback} from 'react';
import MovieList from './components/MovieList';
import './App.css';
import { useState } from 'react';
import AddMovie from './components/AddMovie';
import DeleteMovie from './components/DeleteMovie';
let deleteMovie = []
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMoviesHandler = useCallback(async()=> {
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch('https://react-http-e87b3-default-rtdb.firebaseio.com/movies.json');
      if(!response.ok) {
        throw new Error('Something went wrong ....Retrying');
      }
      const data = await response.json();


      const LoadedMovies = [];
      for(const key in data){
        LoadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate,
        });
      }
        setMovies(LoadedMovies);
        deleteMovie=LoadedMovies

    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false); 
  },[]);
  useEffect(()=> {
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-e87b3-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const data= await response.json();
    console.log(data)
  }
  async function removeMovieHandler(movies) {
    console.log(deleteMovie[0].id)
    const response= await fetch(`https://react-movie-c353a-default-rtdb.firebaseio.com/movies/${deleteMovie[0].id}.json`, {
      method: "DELETE",
    });
 
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
        <DeleteMovie onDelete ={removeMovieHandler}/>
      </section>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
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
