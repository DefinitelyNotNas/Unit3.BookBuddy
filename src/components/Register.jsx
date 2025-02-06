/* TODO - add your code to create a functional React component that renders a registration form */
import React from 'react'

function Register() {

  const FormHandler = (e) => {
    e.preventDefault;
    const form = FormData(e.target)
    const email = form.get("email")
    const password = form.get("password")
  }

  return (
    <>
    <div>Register</div>
    <div>
      <form onSubmit={FormHandler}>
        <label>
          Email
          <input type="email" name='email' />
        </label>
        <br />
        <label>
          Password
          <input type="password" name='password'/>
        </label>
        <br />
        <button type='submit'>Register</button>
      </form>
    </div>
    </>
  )
}

export default Register