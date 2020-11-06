import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'

import {UserContext} from "../lib/userContext";
import getSearchParams from "../utils/getSearchParams";

import CardSection from "../interface/CardSection.jsx";
import Card from "../interface/Card.jsx";
import Avatar from "../interface/Avatar.jsx";
import Tabs from "../interface/Tabs.jsx";
import UserProvider from "../../providers/UserProvider";

function Photos(props) {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const userProvider = new UserProvider();

    useEffect(() => {
        userProvider.photos().then((res) => {
            const photos = res.data;

            setLoading(false)
            setPhotos(photos);
        })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    if (loading) return <a>Loading...</a>

    return (
        <CardSection type='collection'>
            { photos.map((photo) => {
                return <Card key={photo.id} title={photo.title || ''} href={'#'} imageUrl={photo.url}></Card>
            }) }
        </CardSection>
    )
}


function Collections(props) {
    const [loading, setLoading] = useState(true);
    const [collections, setCollections] = useState([]);
    const userProvider = new UserProvider();

    useEffect(() => {
        userProvider.collections().then((res) => {
            const collections = res.data;

            setLoading(false)
            setCollections(collections);
        })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    if (loading) return <a>Loading...</a>

    return (
        <CardSection type='collection'>
            { collections.map((collection) => {
                return <Card key={collection.id} author={collection.author_name} title={collection.title || ''} href={'#'} imageUrl={collection.photo_url}></Card>
            }) }
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
        <Collections></Collections>,
        <Photos></Photos>,
    ]

    render () {
        const {user} = this.props

        return (
            <main>
                <section className="profile__info">
                    <Avatar src={user.avatar_url} type='big'></Avatar>
                    <h1>{`${user.firstName} ${user.lastName}`}</h1>
                    { // <div style={{marginBottom: '25px'}} className="subtitle">100 FOLLOWERS</div>
                        }
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
