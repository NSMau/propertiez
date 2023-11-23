import express from 'express'
import bodyParser from "body-parser";

import listings from './listings'

const app = express()
const PORT = 3000

// Middleware to parse JSON body
app.use(bodyParser.json())

app.get('/listings', (_, res) => res.send(listings))

// curl -X POST http://localhost:3000/delete-listing -H 'Content-Type: application/json' -d '{"id": "001"}'
app.post('/delete-listing', (req, res) => {
    const { id } = req.body

    for (const listing of listings) {
        if (listing.id === id) {
            return res.send(listings.splice(listings.indexOf(listing), 1))
        }
    }

    return res.send('Failed to delete listing')
})

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))