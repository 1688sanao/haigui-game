const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/chat', (req, res) => {
  res.send('API is running. Please use POST.')
})

app.post('/api/chat', (req, res) => {
  const { question, story, message } = req.body
  const userText = question ?? message ?? ''

  console.log('用户输入:', userText)

  let reply = '无关'

  if (userText.includes('死')) {
    reply = '是'
  } else if (userText.includes('自杀')) {
    reply = '否'
  } else if (userText.includes('车祸')) {
    reply = '是'
  }

  res.json({ reply: `【CJS FINAL】${reply}` })
})

app.listen(3000, () => {
  console.log('【SERVER.CJS NEW】running on http://localhost:3000')
})
