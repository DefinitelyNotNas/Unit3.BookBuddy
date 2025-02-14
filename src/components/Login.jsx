/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: `${email}`,
						password: `${password}`,
					}),
				}
			);

			const data = await response.json();
			console.log(data.message);

			localStorage.setItem("token", data.token);
			navigate("/account");
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<form onSubmit={handleLogin}>
				<label>
					Email:
					<input
						type="email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default Login;
