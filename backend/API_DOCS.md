# Haigui Game Backend API

## Base URL

`http://localhost:3001`

## Endpoints

### `GET /`

- Description: Service info
- Response:

```json
{
  "service": "haigui-game-backend",
  "status": "ok",
  "baseUrl": "http://localhost:3001",
  "docs": "/api/docs"
}
```

### `GET /api/test`

- Description: Health check
- Response:

```json
{
  "message": "Backend API is running.",
  "timestamp": "2026-04-02T00:00:00.000Z"
}
```

### `POST /api/chat`

- Description: Ask AI for yes/no/irrelevant answer
- Body:

```json
{
  "question": "女人被雷劈过吗？",
  "story": {
    "id": "soup-001",
    "title": "最后一班电梯",
    "difficulty": "easy",
    "surface": "故事题面",
    "bottom": "故事题底"
  }
}
```

- Success response:

```json
{
  "answer": "否"
}
```

- Error response:

```json
{
  "error": "服务器请求失败",
  "details": "错误详情",
  "requestId": "abcd1234"
}
```
