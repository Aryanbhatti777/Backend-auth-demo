import { createContext, useState } from "react";


export const AuthContext = createContext();

const authProvider = ({ children }) => {
    
    const { user, setUser } = useState(null)
    const { refreshToken, setRefreshToken } = useState(null)
    
    return (
        <AuthContext.Provider value={{user, setUser, refreshToken, setRefreshToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default authProvider;