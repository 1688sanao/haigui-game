import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import { stories } from "../data/stories";
import type { ChatMessage } from "../components/Message";

type GameStatus = "in_progress" | "ended";

function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<GameStatus>("in_progress");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "ai",
      content: "我是主持人。你可以通过提问来推理真相。",
    },
  ]);

  const story = useMemo(() => stories.find((item) => item.id === id), [id]);

  const revealBottom = () => {
    if (!story) {
      return;
    }
    setStatus("ended");
    navigate(`/result/${story.id}`, {
      state: { history: chatHistory, status: "ended", endReason: "reveal" },
    });
  };

  const giveUpGame = () => {
    setStatus("ended");
    navigate("/");
  };

  if (!story) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-slate-100">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center">
          <h1 className="text-2xl font-bold">故事不存在</h1>
          <p className="mt-3 text-slate-300">该故事可能已被移除或链接无效。</p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
          >
            返回大厅
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(99,102,241,0.16),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.12),transparent_35%)]" />
      <section className="relative mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8 sm:py-10">
        <header className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6">
          <Link to="/" className="text-sm text-indigo-300 hover:text-indigo-200">
            ← 返回游戏大厅
          </Link>
          <div className="mt-4">
            <span className="rounded-full border border-indigo-400/35 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-200">
              {status === "in_progress" ? "进行中" : "已结束"}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{story.title}</h1>
          <p className="mt-4 rounded-xl border border-slate-800 bg-slate-950/80 p-4 leading-7 text-slate-200">
            {story.surface}
          </p>
        </header>

        <ChatBox
          story={story}
          onMessagesChange={setChatHistory}
          initialMessages={[
            {
              role: "ai",
              content: "我是主持人。你可以通过提问来推理真相。",
            },
          ]}
        />

        <footer className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={revealBottom}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-amber-400"
            >
              查看汤底
            </button>
            <button
              type="button"
              onClick={giveUpGame}
              className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-700"
            >
              结束游戏（中途放弃）
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default GamePage;
