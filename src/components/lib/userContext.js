import {createContext, createElement, useContext} from 'react'
import UserProvider from "../../providers/UserProvider.js";

const userProvider = new UserProvider()

const UserContext = createContext({
    user: null,
    isAuthenticated: false,
})

const withUser = (Component) => {
    return (props) => {
        return <UserContext.Consumer>{
            <Component></Component>
        }</UserContext.Consumer>
    }
}

const useUser = () => {
    return useContext(UserContext)
}

export {UserContext, withUser, useUser}
