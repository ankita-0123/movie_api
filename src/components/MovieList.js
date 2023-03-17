import React from "react";
import Movie from './Movie';
import style from './MovieList.module.css'
const MovieList = (props) => {
  return (
    <ul className={style['movie-list']}>
        {props.movies.map((movie)=> (
            <Movie
            title={movie.title}
            releaseDate={movie.releaseDate}
            openingText={movie.openingText}
            />
              
        ))}
    </ul>
  )
}

export default MovieList;
