/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function SingleBook() {
    const { id } = useParams()
    const [singleBook, setSingleBook] = useState(null)
    useEffect(() => {
        const fetchSingleBook = async () => {
            try {
                const response = await axios.get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
                setSingleBook(response.data.book)

            } catch (error) {
                console.error(error)
            }
        }

        fetchSingleBook();
    }, [id])

  return ( 
    <>
    catalog
    </>
  )
}

export default SingleBook