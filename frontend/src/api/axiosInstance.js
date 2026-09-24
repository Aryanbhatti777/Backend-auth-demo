import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const useApi = () => {
    const { accessToken, setAccessToken } = useContext(AuthContext)

    const api = axios.create({
        baseURL: "http://localhost:5173/api",
        withCredentials: true
    })

    api.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${accessToken}`

        return config
    })
 
    return api
}

export default useApi;