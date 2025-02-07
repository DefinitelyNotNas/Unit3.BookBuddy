/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect } from "react";

function Account() {
	useEffect(() => {
		try {
			fetch(
				"https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			)
				.then((response) => response.json())
				.then((result) => {
					console.log(result);
				})
				.catch(console.error);
		} catch (error) {
			console.error(error);
		}
	}, []);

	return <div>HELLO SECRET STUFF</div>;
}

export default Account;
