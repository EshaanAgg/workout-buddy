require('dotenv').config()

export const Server = {
    endpoint : process.env.VITE_APP_ENDPOINT,
    project: process.env.VITE_APP_PROJECT,
    collectionID : process.env.VITE_APP_COLLECTION_ID,
    database: process.env.VITE_APP_DATABASE_ID.toString(),
}