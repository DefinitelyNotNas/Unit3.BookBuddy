/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
	const [myBooks, setMyBooks] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await fetch(
					"https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				const data = await response.json();
				setMyBooks(data.reservation ?? []);
			} catch (error) {
				console.error(error);
			}
		};
		fetchBooks();
	}, []);

	const returnBook = async (e, id) => {
		e.preventDefault();
		try {
			const fetched = await fetch(
				`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			const results = await fetched.json();
			setMyBooks(results.books);
		} catch (error) {
			console.error(error);
		}
	};

	const toLibrary = (e) => {
		e.preventDefault();
		navigate("/books");
	};

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="myBookContainer">
			<div>
				<button onClick={handleLogout}>Logout</button>
			</div>
			{myBooks?.length > 0 ? (
				myBooks.map((book) => {
					return (
						<div key={book.id} className="myBooks">
							<img src={book.coverimage} alt={book.title} />
							<p>{book.title}</p>
							<p>{book.author}</p>
							<button
								onClick={(e) => {
									returnBook(e, book.id);
								}}
							>
								Return Book
							</button>
						</div>
					);
				})
			) : (
				<div>
					<p>No books checked out, go to library to find a book </p>

					<button onClick={toLibrary}>Library</button>
				</div>
			)}
		</div>
	);
}

export default Account;
