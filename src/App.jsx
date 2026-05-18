import { useDebounce  } from 'react-use'

import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY 
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const[debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  
  //Debounce the search term to prevent making too many API requests
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500
  ,[searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)
      
      if(!response.ok) {
        throw new Error('Failed to fetch movies.')
      }

      const data = await response.json()
      
      // Errors
      if(data.response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMovieList([])
        return
      }

      //Success
      setMovieList(data.results)
    } catch (error) {
      console.error(`Error fetching the movies: ${error}`)
      setErrorMessage('Error fetching movies. Please try again later')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  return (
    <main>
      <div className="hero-wrapper">
        <div className="pattern"/>
        <section className='hero-section'>

          <div className='col-img1'>
            <div className="img-box">
              <img src="alien.png" alt="alien"/>
            </div>
            <div className="img-box">
              <img src="madmax.png" alt="madmax"/>
            </div>
          </div>

          <div className='title'>
            <div className="title-box">
              <img src="Grand-Tv.svg" alt="title"/>
            </div>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </div>

          <div className='col-img2'>
            <div className="img-box">
              <img src="looper.png" alt="looper"/>
            </div>
            <div className="img-box">
              <img src="bladerunner.png" alt="bladerunner"/>
            </div>
          </div>
        </section>
      </div>

      <div className="wrapper">
        <section className='all-movies'>
          <h2 className='mt-10'>All Movies</h2>
          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App

