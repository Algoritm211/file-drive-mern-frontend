const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 8080


const app = express()


app.use(express.static(__dirname))
app.use(express.static(__dirname, 'build'))


app.get('*', (request, response) => {
  return response.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT)
