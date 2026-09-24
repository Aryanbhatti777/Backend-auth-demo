import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import useApi from '../api/axiosInstance';


const Profile = () => {

    const { user, setUser } = useContext(AuthContext)
    const api = useApi();

    const getProfile = async () => {
        try {
            
            const res = await api.get("/auth/me")
            setUser(res.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    },[])
  return (
      <>
          <div>
              <h1>Profile</h1>
              <p>Welcome {user?.name}</p>
              <p>Your email is {user?.email}</p>
          </div>
      </>
  )
}

export default Profile;