const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())//used to access request body, without this line we wont be able to access request body, it will be an empty object - this is a middleware -used to convert the request from json to object


app.use(cors())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    },
    {
      id: 4,
      content: "new content",
      important: true
    }
  ]

const generateId = () => {
  const maxId = notes.length > 0 ?
   Math.max(...notes.map(n => n.id)): 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  // console.log(request.get('content-type'));
  // console.log(request.headers);
    
  const body = request.body//console.log(body);
  if(!body.content){
    return response.status(400).json({error: 'content missing'})
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }
  notes = notes.concat(note)
  response.json(note)
})

app.get('/', (request, response) => {
  response.send('<h1><hello World!> </h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})


app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  // console.log(note);
  if(note){
    response.json(note)
  } else {
    response.status(404).end()
  }
})
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(400).send({'error': 'unknown endpoint'})
}

app.use(unknownEndpoint)

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type':'application/json'})
//     response.end(JSON.stringify(notes))
// })

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)


