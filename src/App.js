import React, {useEffect, useState} from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './Search.svg';

const API_URL = 'https://www.omdbapi.com?apikey=82af9a09';

const App = ()=> {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('');
  }, [])

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          placeholder="Search for movies"
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon} 
          alt="search"   
          onClick={()=>searchMovies(searchTerm)}
        />
      </div>

      {movies?.length >0 ? (
        <div className="container">
          {movies.map((movie)=> (
            <MovieCard movie={movie} />
          ))}
        </div>
      ):(
        <div className="empty">
          <h2>No Movies Found :(</h2>
        </div>
      )}
    </div>
  );
}

export default App;
