/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SingleBook() {
	const { id } = useParams();
	console.log("user ID: ", id);
	const [singleBook, setSingleBook] = useState(null);
	useEffect(() => {
		const fetchSingleBook = async () => {
			try {
				const response = await axios.get(
					`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
				);
				setSingleBook(response.data.book);
			} catch (error) {
				console.error(error);
			}
		};

		fetchSingleBook();
	}, [id]);

	if (!singleBook) {
		return <div>Loading...</div>;
	}

	const checkoutBook = async (id) => {
		try {
			const response = await fetch(
				`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({ checkedOut: true }),
				}
			);
			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error(error);
		}
		setSingleBook((prevBook) => ({ ...prevBook, available: false }));
	};

	return (
		<div>
			<img src={singleBook.coverimage} alt={singleBook.title} />
			<h2>{singleBook.title}</h2>
			<p>{singleBook.author}</p>
			<p>{singleBook.description}</p>
			{localStorage.getItem("token") && (
				<button
					disabled={!singleBook.available}
					onClick={() => checkoutBook(id)}
				>
					{singleBook.available ? "Checkout Book" : "Not Available"}
				</button>
			)}
			<Link to="/books"> Go Back</Link>
		</div>
	);
}
export default SingleBook;
