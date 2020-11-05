import fetch from '../utils/fetch.js'

class FeedProvider {

    /* *params (object) {id: int, limit: int} */
    /* returns Promise<AxiosResponse> */
    getCollections = async (params) => {
        const collections = await fetch.get('/feed/collections.php', {
            params
        })

        return collections
    }

    getCollectionPhotos = async (collectionId, limit=undefined) => {
        const photos = await fetch.get('/feed/photos.php', {
            params: {
                collection_id: collectionId,
                limit
            }
        })

        return photos
    }
}

export default FeedProvider
