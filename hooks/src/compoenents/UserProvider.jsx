import React, { createContext } from 'react'

const user = {
    name: "surya"
}

export const UserContext = createContext({name:"user"})

function UserProdivder({ children }) {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>

    )
}

export default UserProdivder
 