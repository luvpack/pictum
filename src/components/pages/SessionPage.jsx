import React from 'react'
import {Link} from 'react-router-dom'
import {withRouter}  from 'react-router'

import Tabs from "../interface/Tabs.jsx";

import SignInForm from "../forms/SignIn.jsx";
import SignUpForm from "../forms/SignUp.jsx";

import getSearchParams from "../utils/getSearchParams.js";

const TYPES = {
    'signin': 0,
    'signup': 1
}

class SessionPage extends React.Component {
    action = this.props.match.params['action']

    state = {
        currentTab: TYPES[this.action] || 0
    }

    componentWillReceiveProps(nextProps) {
        const newTab = TYPES[nextProps.match.params.action]

        if(this.state.currentTab !== newTab) {
            this.setState(() => ({ currentTab: newTab }))
        }
    }

    render() {
        return (
            <div className='center-container'>
                <Link to='/' style={{position: 'absolute', left: '20px', top: '30px', padding: '10px 15px'}}
                      className="button secondary">
                    Back to <b>Pictum</b>
                </Link>
                <section className='hero'>
                    <div style={{marginBottom: '40px'}}>
                        <h1>Sign In</h1>
                        <div className="subtitle text-center">Sign in to use the application and all the features of the
                            service
                        </div>
                    </div>
                    <Tabs style={{marginBottom: '40px'}} selected={this.state.currentTab} tabs={[{title: 'Sign In', to: '/session/signin'}, {title: 'Sign Up', to: '/session/signup'}]} />
                    {
                        this.state.currentTab === 0 ? <SignInForm /> : <SignUpForm/>
                    }
                </section>
            </div>
        )
    }
}

export default SessionPage
