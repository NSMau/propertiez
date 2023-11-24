import { MongoClient } from 'mongodb'
import { Database } from '../lib/types'

const { DB_NAME, DB_COLLECTION, DB_USER, DB_USER_PASSWORD, DB_CLUSTER_ADDRESS } = process.env
const CONNECTION_STRING: string = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER_ADDRESS}/?retryWrites=true&w=majority`

async function connectDatabase(): Promise<Database> {
    const client = await MongoClient.connect(CONNECTION_STRING)

    const db = client.db(DB_NAME)

    return {
        // @ts-ignore
        listings: db.collection(DB_COLLECTION)
    }
}

export default connectDatabase
