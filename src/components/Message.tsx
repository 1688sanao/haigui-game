export type MessageRole = "user" | "ai";

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

interface MessageProps {
  message: ChatMessage;
}

function Message({ message }: MessageProps) {
  const isUser = message.role === "user";
  const isThinking = message.role === "ai" && message.content === "思考中...";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[85%] items-end gap-2 sm:max-w-[75%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${
            isUser
              ? "bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-400/40"
              : "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40"
          }`}
          aria-hidden="true"
        >
          {isUser ? "你" : "AI"}
        </div>

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm transition duration-200 ${
            isUser
              ? "rounded-br-md bg-indigo-500 text-white"
              : "rounded-bl-md border border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-500"
          }`}
        >
          {isThinking ? (
            <span className="inline-flex items-center gap-1.5 text-slate-200">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-300" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-300 [animation-delay:120ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-300 [animation-delay:240ms]" />
              思考中...
            </span>
          ) : (
            message.content
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
