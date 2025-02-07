/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Books.css'
import { useNavigate } from 'react-router-dom'

function Books() {
    const navigate = useNavigate();
    const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
    const [ catalog , setCatalog] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(API)
                setCatalog(response.data.books)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBooks();
    }, [])
    console.log(catalog)
  return (
     /*
     div - container
        div - book
            a 
                - book info
            button 
                - checkout info  
     */ 
    <div className='container'>
        {catalog.map((book) => (
            <div key={book.id} className='book'>
                <a onClick={() => navigate(`/books/${book.id}`)}>
                    <img src={book.coverimage} alt={book.title} />
                    <p>{book.title}</p>
                    <p>Author: {book.author} </p>
                    <p>Available: {book.available ? "Yes" : "No" }</p>
                </a>
                <button disabled={!book.available}>
                        {book.available ? 'Checkout Book' : 'Not Available'}
                    </button>

            </div>
        ))}
    </div>
  )
}

export default Books