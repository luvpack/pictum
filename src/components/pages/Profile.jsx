import React from 'react'
import {withRouter} from 'react-router-dom'

import {UserContext} from "../lib/userContext";
import getSearchParams from "../utils/getSearchParams";

import CardSection from "../interface/CardSection.jsx";
import Card from "../interface/Card.jsx";
import Avatar from "../interface/Avatar.jsx";
import Tabs from "../interface/Tabs.jsx";

function Photos(props) {
    return (
        <CardSection type='collection'>
            <Card title='Architecture' author='Eugene Mandelstam' href='#' imageUrl='https://images.unsplash.com/photo-1604062459109-fe36dde64999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80'/>
            <Card title='Architecture' author='Eugene Mandelstam' href='#' imageUrl='https://images.unsplash.com/photo-1604062459109-fe36dde64999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80'/>
            <Card title='Architecture' author='Eugene Mandelstam' href='#' imageUrl='https://images.unsplash.com/photo-1604062459109-fe36dde64999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80'/>
            <Card title='Architecture' author='Eugene Mandelstam' href='#' imageUrl='https://images.unsplash.com/photo-1604062459109-fe36dde64999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80'/>
            <Card title='Architecture' author='Eugene Mandelstam' href='#' imageUrl='https://images.unsplash.com/photo-1604062459109-fe36dde64999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80'/>
            <Card title='Architecture' author='Eugene Mandelstam' href='#' imageUrl='https://images.unsplash.com/photo-1604062459109-fe36dde64999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80'/>
        </CardSection>
    )
}

const TYPES = {
    'photos': 0,
    'collections': 1,
    'favorites': 2
}

class Profile extends React.Component {
    static contextType = UserContext

    view = this.props.match.params['view']

    state = {
        currentTab: TYPES[this.view] || 0
    }

    componentDidMount() {
        if (!this.view) {
            this.props.history.replace('/profile/photos')
        }
    }

    static getDerivedStateFromProps(props, state) {
        const newView = TYPES[props.match.params['view']]

        if (newView !== state.currentTab) {
            return {currentTab: newView}
        }

        return {}
    }

    tabs = [
        <Photos></Photos>,
        <Photos></Photos>,
        <Photos></Photos>,
    ]

    render () {
        const {user} = this.props

        return (
            <main>
                <section className="profile__info">
                    <Avatar src={user.avatar_url} type='big'></Avatar>
                    <h1>{`${user.firstName} ${user.lastName}`}</h1>
                    <div style={{marginBottom: '25px'}} className="subtitle">100 FOLLOWERS</div>
                    <Tabs selected={this.state.currentTab || 0} tabs={[{title: 'Photos', to: '/profile/photos'}, {title: 'Collections', to: '/profile/collections'}, {title: 'Favorites', to: '/profile/favorites'}]}></Tabs>
                </section>
                {
                    this.tabs[this.state.currentTab]
                }
            </main>
        )
    }
}

export default Profile
