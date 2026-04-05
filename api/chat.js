/** Vercel：/api/chat → 本文件（勿依赖 rewrite 到 index） */
import { createRequire } from "module";

const require = createRequire(import.meta.url);
export default require("../backend/server.js");
