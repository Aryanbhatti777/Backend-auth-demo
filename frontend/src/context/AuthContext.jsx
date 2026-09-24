import { createContext, useState } from "react";


export const AuthContext = createContext();

const authProvider = ({ children }) => {
    
    const [ user, setUser ] = useState(null)
    const [ accessToken, setAccessToken ] = useState(null)

    return (
        <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default authProvider;