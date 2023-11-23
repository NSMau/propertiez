const express = require('express')
const app = express()
const port = 3000

app.get('/', (_, res) => res.send('Hello, world!'))

app.listen(port, () => console.log(`App listening on http://localhost:${port}`))