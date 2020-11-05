import React from 'react'
import {withRouter} from 'react-router-dom'

import UserProvider from "../../providers/UserProvider.js"
import {UserContext} from "../lib/userContext.js";

class SignInForm extends React.Component {
    userProvider = new UserProvider()
    static contextType = UserContext

    state = {
        email: '',
        password: '',
        error: false,
        errorText: ''
    }

    onSubmit = async (event) => {
        event.preventDefault()

        const res = await this.userProvider.login(this.state.email, this.state.password)

        if (res.status === 200) {
            const user = res.data.data

            this.context.setUser(user)
            this.props.history.push('/feed')
        } else {
            this.setState({error: true, errorText: 'Some error. '})
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render () {
        return (
            <div style={{display: 'contents'}}>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '85%',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                    }} className={'form'}>
                    <input onChange={this.handleInput} type="text" name="email" placeholder="Electromail" />
                    <input onChange={this.handleInput} type="password" name="password" placeholder="Password" />
                    <button onClick={this.onSubmit} style={{marginTop: '10px'}} type="submit">Next</button>
                </form>
                <a href="#" className="subtitle">Lost password?</a>
            </div>
        )
    }
}

export default withRouter(SignInForm)
