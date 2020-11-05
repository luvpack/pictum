import React from 'react'

import CardSection from "../interface/CardSection.jsx";
import Card from "../interface/Card.jsx";
import FeedProvider from "../../providers/FeedProvider.js";
import {Link} from "react-router-dom";

class Collection extends React.Component {
    feedProvider = new FeedProvider()

    state = {
        loading: true,
        collection: null,
        photos: null
    }

    setCollection = (data) => this.setState({collection: data})
    setLoading = loading => this.setState({loading})
    setPhotos = photos => this.setState({photos})

    async componentDidMount() {
        await this.feedProvider.getCollections({ id: this.props.id })
            .then((res) => {
                let collection = res.data.collections[0]

                if (!collection) {
                    console.error('Null of elements from collection')
                    this.setLoading(true)

                    return null;
                }

                return collection
            }).then(async (collection) => {
                if (!collection) {
                    console.error('Error in collection data: ', collection)
                    return false
                }

                const photosRes = await this.feedProvider.getCollectionPhotos(collection.id)

                if (!photosRes.status === 200) throw new Error('Error in photos fetch data')

                const photos = photosRes.data.photos

                console.log(collection, photos)
                this.setPhotos(photos)
                this.setCollection(collection)
                this.setLoading(false)
            })
            .catch(err => {
                console.log(err)
                this.setLoading(false)
            })
    }

    render () {
        return (
            this.state.loading ? <a>Loading..</a> :
                <>
                    <Link to={'/feed'} style={{position: 'absolute', left: '10px'}} className="button secondary rounded">
                        { '<' }
                    </Link>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: '40px'
                    }}>
                        <div>
                            <h1>{this.state.collection.title}</h1>
                            <div className="subtitle">by <a href="#">{ this.state.collection.author_name }</a></div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <a className="button secondary">Download</a>
                            <a className="button secondary">Like</a>
                            <a className="button secondary rounded">Add to favorites</a>
                        </div>
                    </div>
                    <CardSection type={'collection'}>
                        {
                            this.state.photos.map((photo) => {
                                return <Card key={photo.id} imageUrl={photo.url} author={photo.author_name}></Card>
                            })
                        }
                    </CardSection>
                </>
        )
    }
}

export default Collection
