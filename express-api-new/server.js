const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json({
  limit: '2mb',
  verify: (req, res, buf) => {
    if (req.method === 'POST' && String(req.url || '').includes('api/chat')) {
      console.log('原始 POST body 字符串:', buf?.length ? buf.toString() : '(空)')
    }
  },
}))

app.get('/api/chat', (req, res) => {
  res.send('API is running. Please use POST.')
})

app.post('/api/chat', (req, res) => {
  console.log('收到完整 req.body:', req.body)

  const { question, story, message } = req.body || {}

  console.log('收到 question:', question)
  console.log('收到 story:', story)
  console.log('收到 message:', message)

  const userText = question ?? message

  if (userText === undefined || userText === null || String(userText).trim() === '') {
    return res.status(400).json({
      error: '没有收到 question 或 message',
      receivedBody: req.body,
    })
  }

  res.json({
    reply: `你说的是：${userText}`,
  })
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
