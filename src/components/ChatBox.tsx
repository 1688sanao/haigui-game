import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import Message, { type ChatMessage } from "./Message";
import { CHAT_API_URL } from "../api";
import type { Story } from "../data/stories";

interface ChatBoxProps {
  story: Story;
  initialMessages?: ChatMessage[];
  onMessagesChange?: (messages: ChatMessage[]) => void;
}

type ChatStatus = "idle" | "sending" | "error";

function ChatBox({
  story: currentStory,
  initialMessages,
  onMessagesChange,
}: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages ?? [
      {
        role: "ai",
        content: "欢迎来到海龟汤，开始提问吧。",
      },
    ],
  );
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [lastQuestion, setLastQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isLoading = status === "sending";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    onMessagesChange?.(messages);
  }, [messages, onMessagesChange]);

  const sendMessage = async (textOverride?: string) => {
    const userInput = (textOverride ?? input).trim();
    if (!userInput || isLoading) {
      return;
    }

    setError(null);
    setStatus("sending");
    setLastQuestion(userInput);
    setInput("");

    try {
      console.log("准备发送 question:", userInput);
      console.log("准备发送 story:", currentStory);

      const payload = JSON.stringify({
        question: userInput,
        story: currentStory,
      });

      console.log("实际发送的 JSON 字符串:", payload);

      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `服务异常（${res.status}）`);
      }

      const data = (await res.json()) as {
        answer?: string;
        narration?: string;
        error?: string;
      };

      console.log("后端返回:", data);

      const aiText = [data.answer, data.narration].filter(Boolean).join(" ");

      setMessages((prev) => [
        ...prev,
        { role: "user", content: userInput },
        { role: "ai", content: aiText || "后端没有返回内容" },
      ]);

      setStatus("idle");
    } catch (err) {
      console.error("请求失败:", err);
      setStatus("error");
      const detail = err instanceof Error ? err.message : "未知错误";
      setError(`请求失败：${detail}`);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage();
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await sendMessage();
    }
  };

  return (
    <section className="flex h-[68vh] min-h-[420px] w-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg shadow-indigo-950/20 sm:h-[560px]">
      <div className="flex-1 space-y-3 overflow-y-auto p-3 pb-2 sm:p-4">
        {messages.length === 0 ? (
          <div className="grid h-full place-items-center px-4 text-center">
            <div className="max-w-sm rounded-xl border border-dashed border-slate-700 bg-slate-900/80 p-5">
              <p className="text-sm font-medium text-slate-200">还没有消息</p>
              <p className="mt-2 text-sm text-slate-400">
                先问一个问题，比如“这是意外吗？”
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className="animate-in fade-in slide-in-from-bottom-1 duration-300 motion-reduce:animate-none"
            >
              <Message message={message} />
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-3 pb-2 sm:px-4" aria-live="polite">
        {error && (
          <div className="animate-in fade-in zoom-in-95 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200 duration-200">
            <div className="flex items-center justify-between gap-3">
              <span>{error}</span>
              {lastQuestion && (
                <button
                  type="button"
                  onClick={() => void sendMessage(lastQuestion)}
                  disabled={isLoading}
                  className="shrink-0 rounded-md bg-rose-500/20 px-2.5 py-1 text-xs font-medium text-rose-100 transition hover:bg-rose-500/30 disabled:opacity-60"
                >
                  重试
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-slate-800 p-3 sm:gap-3 sm:p-4"
      >
        <input
          id="chat-question"
          name="chatQuestion"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入你的问题..."
          disabled={isLoading}
          className="h-11 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
        />
        <button
          type="submit"
          disabled={isLoading || input.trim().length === 0}
          className="inline-flex h-11 min-w-[84px] items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white transition hover:scale-[1.02] hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          )}
          {isLoading ? "发送中" : "发送"}
        </button>
      </form>
    </section>
  );
}

export default ChatBox;