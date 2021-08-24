import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
function App() {
  const [search, setSearch] = useState('')
  const [photo, setPhoto] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const getPhoto = async () => {
    try {
      setLoading(true)
      let url
      let pageItem = `&page=${page}`
      const urlQuery = `&query=${search}`

      if (search) {
        url = `${searchUrl}${clientID}${pageItem}${urlQuery}`
      } else {
        url = `${mainUrl}${clientID}${pageItem}`
      }

      const response = await fetch(url)
      const data = await response.json()

      setPhoto((currentPhoto) => {
        if (search && page === 1) {
          return data.results
        } else if (search) {
          return [...currentPhoto, ...data.results]
        } else {
          return [...currentPhoto, ...data]
        }
      })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    getPhoto()
  }

  useEffect(() => {
    const scrollEvent = window.addEventListener('scroll', () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 3
      ) {
        setPage((currentPage) => {
          return currentPage + 1
        })
      }
    })
    return () => window.removeEventListener('scroll', scrollEvent)
  })

  useEffect(() => {
    getPhoto()
    //eslint-disable-next-line
  }, [page])

  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            className='form-input'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className='submit-btn' type='submit' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photo.map((item, index) => {
            return <Photo key={index} item={item} />
          })}
        </div>
      </section>
      {loading && <h1 className='loading'>loading...</h1>}
    </main>
  )
}

export default App
