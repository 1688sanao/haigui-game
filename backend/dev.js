const app = require("./server.js");
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log("-----------------------------------------");
  console.log(`服务端已启动: http://${HOST}:${PORT}`);
  console.log("API 文档: /api/docs");
  console.log("-----------------------------------------");
});
