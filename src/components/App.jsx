import React, {Context} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {Cube} from 'react-preloaders'

import Navigation from "./interface/Navigation.jsx";
import MainPage from "./pages/Main.jsx";
import SessionPage from "./pages/SessionPage.jsx";
import Feed from "./pages/Feed.jsx";
import Profile from "./pages/Profile.jsx";
import Collection from "./pages/Collection.jsx";

import Dropdown from "./interface/Dropdown.jsx";

import UserProvider from "../providers/UserProvider";
import {UserContext} from "./lib/userContext";

class App extends React.Component {
    userProvider = new UserProvider()

    state = {
        isAuthenticated: false,
        user: null,
        loading: true
    }

    setUser = (user) => {
        this.setState({user: user, isAuthenticated: !!user})
    }

    logout = async () => {
        localStorage.clear()
        await this.userProvider.logout()
        this.setUser(null)
    }

    getUser = async () => {
        await this.userProvider.me().then((res) => {
            const user = res.data.message

            this.setUser(user)
            this.setLoading(false)
        }).catch((err) => {
            this.setUser(null)
            this.setLoading(false)
        })
    }

    setLoading = (loading) => this.setState({loading})

    async componentDidMount() {
        await this.getUser()
    }

    render () {
        return (
                this.state.loading ? <>Loading...</> : (
                    <UserContext.Provider value={{user: this.state.user, isAuthenticated: this.state.isAuthenticated, logout: this.logout, getUser: this.getUser, setUser: this.setUser}}>
                        <Router>
                            <Dropdown></Dropdown>
                            <Navigation avatarUrl={this.state.user ? this.state.user.avatar_url : null} isAuthenticated={this.state.isAuthenticated} />
                            <Switch>
                                <Route path='/profile/:view?' render={(props) => {
                                    return this.state.isAuthenticated ?
                                        <Profile {...props} user={this.state.user}></Profile>
                                        : <Redirect to={'/session/signin'}></Redirect>
                                }}/>
                                <Route path='/feed'>
                                    {
                                        this.state.isAuthenticated ?
                                            <Feed></Feed>
                                            : <Redirect to={'/session/signin'}></Redirect>
                                    }
                                </Route>
                                <Route path='/collection/:id' render={(props) => {
                                    if (!this.state.isAuthenticated) {
                                        return <Redirect to={'/session/signin'}></Redirect>
                                    }

                                    if (!props.match.params['id']) {
                                        return <Redirect to={'/feed'}></Redirect>
                                    }

                                    return <Collection id={props.match.params['id']}></Collection>
                                }}/>
                                <Route path='/session/:action?' render={(props) => {
                                    return this.state.isAuthenticated ? <Redirect to='/feed' /> : <SessionPage {...props} />
                                }}/>
                                <Route exact path='/'>
                                    {
                                        this.state.isAuthenticated ? <Redirect to='/feed' /> : <MainPage></MainPage>
                                    }
                                </Route>
                                <Router>
                                    <>404</>
                                </Router>
                            </Switch>
                        </Router>
                    </UserContext.Provider>
                )
        )
    }
}

export default App
