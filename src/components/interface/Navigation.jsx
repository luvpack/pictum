import React from 'react';
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'

import Avatar from "./Avatar.jsx"

const NavLink = (props) => {
    return <li>
        <Link className={props.cta ? 'button' : null} to={props.href || '/'}>{props.title}</Link>
    </li>
}

class Navigation extends React.Component {
    defaultData = [
        {title: `Main`, href: '/'},
        {title: `API`, href: '#'},
        {title: `Donate`, href: '#'},
        {title: `Sign In`, href: '/session?signin'},
        {title: `Sign Up`, href: '/session?signup', cta: true},
    ]

    authenticatedData = [
        {title: 'Feed', href: '/feed'},
        {title: 'Photos', href: '#'},
        {title: `Collections`, href: '#'},
    ]

    render () {
        if (this.props.location.pathname.includes('/collection/') || this.props.location.pathname.includes('/session/') ) {
            return null
        }

        return (
            <header>
                <Link to={'/'} className="logo">
                    <img style={{marginRight: '10px'}} width="30px" src="/assets/images/logo.png" />
                    <h3>Pictum</h3>
                </Link>
                <div className="header__links">
                    <ul className="nav h">
                        {
                            this.props.isAuthenticated ? this.authenticatedData.map((data, index) => {
                                return <NavLink key={index} cta={data.cta} href={data.href} title={data.title}></NavLink>
                            }) : this.defaultData.map((data, index) => {
                                return <NavLink key={index} cta={data.cta} href={data.href} title={data.title}></NavLink>
                            })
                        }
                        {
                            this.props.isAuthenticated ?
                                (
                                    <li className={'avatar'}>
                                        <Avatar src={this.props.avatarUrl}></Avatar>
                                    </li>
                                ) : null
                        }

                    </ul>
                </div>
            </header>
        )
    }
}

export default withRouter(Navigation)
