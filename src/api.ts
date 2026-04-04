import type { Story } from "./data/stories";

/** 开发环境走 Vite 代理（同源 /api），生产可用 VITE_API_CHAT_URL 指定完整地址 */
function getChatApiUrl(): string {
  const fromEnv = import.meta.env.VITE_API_CHAT_URL as string | undefined;
  if (fromEnv) {
    return fromEnv;
  }
  if (import.meta.env.DEV) {
    return "/api/chat";
  }
  return "/api/chat";
}

const INVALID_ANSWER_HINT =
  "这次回答不符合规则，请换个问法重新提问（回答只能是：是、否、无关）。";

function normalizeAnswer(content: string): "是" | "否" | "无关" | null {
  const firstLine = content.trim().split(/\r?\n/)[0] || "";
  const head = firstLine.split(/[。．]/)[0].trim();
  const compact = head.replace(/[\s【】]/g, "");
  if (compact === "是" || head === "是") {
    return "是";
  }
  if (compact === "否" || compact === "不是" || head === "否" || head === "不是") {
    return "否";
  }
  if (
    compact === "无关" ||
    compact === "不相关" ||
    compact === "与此无关" ||
    head === "无关" ||
    head === "与此无关"
  ) {
    return "无关";
  }
  return null;
}

type ChatSuccessBody = {
  answer?: string;
  narration?: string;
  kind?: "judgment" | "narrative";
};
type ChatErrorBody = { error?: string; details?: string };

export async function askAI(question: string, story: Story): Promise<string> {
  const chatUrl = getChatApiUrl();
  try {
    const response = await fetch(chatUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, story }),
    });

    const rawText = await response.text();
    let data: ChatSuccessBody & ChatErrorBody = {};
    try {
      data = rawText ? (JSON.parse(rawText) as ChatSuccessBody & ChatErrorBody) : {};
    } catch {
      throw new Error(
        rawText.slice(0, 200) || `服务器返回非 JSON（${response.status}）`,
      );
    }

    if (!response.ok) {
      const msg =
        data.error ||
        data.details ||
        `服务异常（${response.status}）`;
      throw new Error(msg);
    }

    const content = data.answer?.trim();
    if (!content) {
      throw new Error("服务器未返回有效回答。");
    }

    if (data.kind === "narrative") {
      return content;
    }

    const normalizedAnswer = normalizeAnswer(content);
    if (!normalizedAnswer) {
      return INVALID_ANSWER_HINT;
    }

    if (data.narration?.trim()) {
      return `${normalizedAnswer}。\n${data.narration.trim()}`;
    }

    return normalizedAnswer;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "网络异常：请确认后端已启动，且接口地址为 " + chatUrl,
      );
    }
    if (error instanceof Error) {
      throw new Error(`调用 AI 失败：${error.message}`);
    }
    throw new Error("调用 AI 失败：未知错误。");
  }
}
