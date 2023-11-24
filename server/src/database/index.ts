import { MongoClient } from 'mongodb'

const USERNAME: string = 'propertiez-king'
const PASSWORD: string = '5pLufdQy40CNJ4pg'
const CLUSTER_ADDRESS: string = 'cluster0.ccgbh1c.mongodb.net'
const CONNECTION_STRING: string = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER_ADDRESS}/?retryWrites=true&w=majority`

async function connectDatabase() {
    const client = await MongoClient.connect(CONNECTION_STRING)

    const db = client.db('propertiez_dev')

    return {
        listings: db.collection('listings')
    }
}

export default connectDatabase
