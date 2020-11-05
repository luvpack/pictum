import React from 'react'

import CardSection from "../interface/CardSection.jsx";
import Card from "../interface/Card.jsx";

import FeedProvider from "../../providers/FeedProvider.js";

class Feed extends React.Component {
    feedProvider = new FeedProvider()

    state = {
        loading: true,
        collections: null
    }

    setLoading = (loading) => this.setState({loading})

    setData = (collections) => this.setState({collections})

    async componentDidMount() {
        await this.feedProvider.getCollections().then((res) => {
            const collections = res.data.collections

            this.setData(collections)
            this.setLoading(false)

            console.log(this.state)
        }).catch((err) => {
            console.error(err)
            this.setLoading(false)
        })
    }

    render () {
        return (
            this.state.loading ? <a>Loading..</a> :
                <main>
                    <section className="top-collection image-card"
                             style={{
                                 height: '450px',
                                 backgroundImage: `url('https://images.unsplash.com/photo-1604062459109-fe36dde64999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80')`
                             }}>
                        <div className="about">
                            <h2>Architecture</h2>
                            <div className="subtitle">by Eugene Mandelstam</div>
                        </div>
                    </section>
                    <CardSection title='Popular' type='secondary'>
                        {
                            this.state.collections.map((collection) => {
                                return <Card key={collection.id} href={`/collection/${collection.id}`} title={collection.title} author={collection.author_name} imageUrl={collection.photo_url}></Card>
                            })
                        }
                    </CardSection>
                </main>
        )
    }
}

export default Feed
