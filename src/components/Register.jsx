/* TODO - add your code to create a functional React component that renders a registration form */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
	const navigate = useNavigate();
	const [token, setToken] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						firstname: `${firstname}`,
						lastname: `${lastname}`,
						email: `${email}`,
						password: `${password}`,
					}),
				}
			);

			const data = await response.json();
			if (data.token) {
				localStorage.setItem("token", data.token);
				setToken(data.token);
				navigate("/account");
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div>Register</div>
			<div>
				<form onSubmit={handleRegister}>
					<label>
						First Name
						<input
							type="text"
							name="firstname"
							onChange={(e) => setFirstname(e.target.value)}
							required
						/>
					</label>
					<br />
					<label>
						Last Name
						<input
							type="text"
							name="lastname"
							onChange={(e) => setLastname(e.target.value)}
							required
						/>
					</label>
					<br />
					<label>
						Email
						<input
							type="email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<br />
					<label>
						Password
						<input
							type="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<br />
					<button type="submit">Sign Up</button>
				</form>
			</div>
		</>
	);
}

export default Register;
