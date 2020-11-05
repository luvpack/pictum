import React, {useEffect, useState, useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'

import UserProvider from "../../providers/UserProvider";

function Dropdown(props, a) {
    const userContext = useUser()

    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        const handler = (event) => {
            const avatar = document.querySelector('li.avatar > a > div')

            if (avatar) {
                const isClickInside = avatar.contains(event.target);
                if (!isClickInside) {
                    setHidden(true)
                } else {
                    setHidden(!hidden)
                }
            }
        }

        document.addEventListener('click', handler);

        return () => document.removeEventListener('click', handler)
    }, [])

    const logout = () => {
        userContext.logout().then((res) => {
            props.history.replace('/session/signin')
        })
    }

    return (
        <div className={`dropdown ${hidden ? 'hidden' : ''}`}>
            <div>
                <Link to='/profile'>My Profile</Link>
                <Link to='/profile'>Settings</Link>
                <a onClick={logout}>Logout</a>
            </div>
        </div>
    )
}

import {UserContext, useUser} from "../lib/userContext";

export default withRouter(Dropdown)
