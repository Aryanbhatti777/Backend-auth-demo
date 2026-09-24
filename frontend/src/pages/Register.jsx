import React, { useContext, useState } from 'react'
import api from '../api/axiosInstance'
import{ AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router'


const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { user, accessToken, setUser, setAccessToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/register", { name, email, password })
            setAccessToken(res.data.accessToken)
            setUser(res.data.user)
            navigate("/profile")
        } catch (error) {
            console.log(error)
        }
    }

    console.log(user, accessToken)


  return (
      <>
          <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input type="text" name='name' placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              <label>Email</label>
              <input type="email" name='email' placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <label>Password</label>
              <input type="password" name='password' placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <input type="submit" />
          </form>
      </>
  )
}

export default Register;