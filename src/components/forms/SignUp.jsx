import React from 'react'

import UserProvider from "../../providers/UserProvider.js"
import {UserContext} from "../lib/userContext.js";

class SignUpForm extends React.Component {
    userProvider = new UserProvider()
    static contextType = UserContext

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        repassword: ''
    }

    onSubmit = async (event) => {
        event.preventDefault()

        const data = this.state

        delete data['repassword']

        const res = await this.userProvider.register(data)

        if (res.status === 200) {
            const user = res.data.data

            // this.context.setUser(user)
            this.props.history.push('/session/signin')
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
                <form style={{width: '85%'}} id="registerForm" method="post" className="form">
                    <div style={{display: 'grid', gridTemplateColumns: '50% 50%'}}>
                        <input onChange={this.handleInput} type="text" name="firstName" placeholder="First Name" />
                        <input onChange={this.handleInput} type="text" name="lastName" placeholder="Last Name" />
                    </div>
                    <input onChange={this.handleInput} type="text" name="email" placeholder="Electromail" />
                    <input onChange={this.handleInput} type="password" name="password" placeholder="Password" />
                    <input onChange={this.handleInput} type="password" name='repassword' placeholder="Repeat Password" />
                    <button onClick={this.onSubmit} style={{marginTop: '10px'}} type="submit">Next</button>
                </form>
            </div>
        )
    }
}

export default SignUpForm
