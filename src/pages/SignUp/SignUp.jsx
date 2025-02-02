import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'


const SignUp = () => {

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState(null)

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!name) {
      seterror("Please enter you name")
    }

    if (!validateEmail(email)) {
      seterror("Please enter a valid email address.")
      return;
    }

    if (!password) {
      seterror("Please enter a password")
      return;
    }

    seterror(" ")
  }

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>

        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignup} >
            <h4 className='text-2xl mb-7'>SignUp</h4>

            <input type='text' placeholder='Name'
              className='input-Box'
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <input type='text' placeholder='Email'
              className='input-Box'
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            {error &&
              <p className='text-red-500 text-xs pb-1'>{error}</p>
            }

            <button type='submit' className='btn-primary'>Create Account</button>

            <p className='text-sm text-center mt-4'>
              Already have an account?{" "}
              <Link to="/login" className='font-medium text-primary underline'>
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
