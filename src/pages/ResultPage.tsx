import { Link, useLocation, useParams } from "react-router-dom";
import Message, { type ChatMessage } from "../components/Message";
import { stories } from "../data/stories";

type GameStatus = "in_progress" | "ended";
type EndReason = "reveal" | "give_up";

interface ResultLocationState {
  history?: ChatMessage[];
  status?: GameStatus;
  endReason?: EndReason;
}

function ResultPage() {
  const { id } = useParams();
  const location = useLocation();
  const state = (location.state as ResultLocationState | null) ?? null;
  const history = state?.history ?? [];
  const status = state?.status ?? "ended";
  const endReason = state?.endReason ?? "reveal";
  const story = stories.find((item) => item.id === id);

  if (!story) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-slate-100">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center">
          <h1 className="text-2xl font-bold">结果不存在</h1>
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
    <main className="relative min-h-screen overflow-hidden bg-[#07080d] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-8%,rgba(179,206,255,0.18),transparent_36%),radial-gradient(circle_at_0%_35%,rgba(99,24,24,0.24),transparent_42%),radial-gradient(circle_at_100%_28%,rgba(52,76,120,0.24),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,14,0.5)_0%,rgba(6,8,14,0.78)_42%,rgba(5,6,11,0.95)_100%)]" />
      <section className="relative mx-auto max-w-5xl space-y-6 px-6 py-10">
        <header className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-[2px]">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            result
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
              {status === "ended" ? "已结束" : "进行中"}
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {endReason === "give_up" ? "中途放弃" : "主动揭晓"}
            </span>
          </div>
          <h1 className="mt-3 bg-gradient-to-b from-slate-100 to-slate-400 bg-clip-text text-3xl font-bold text-transparent">
            {story.title}
          </h1>
        </header>

        <section className="relative overflow-hidden rounded-2xl border border-amber-400/35 bg-[linear-gradient(180deg,rgba(95,58,20,0.16),rgba(21,17,14,0.64))] p-6 shadow-lg shadow-amber-900/20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(245,158,11,0.22),transparent_28%),radial-gradient(circle_at_90%_100%,rgba(120,53,15,0.2),transparent_34%)] opacity-90" />
          <div className="mb-4 flex items-center gap-3">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-200">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-amber-300 opacity-75" />
            </span>
            <p className="text-sm uppercase tracking-[0.25em] text-amber-200">
              汤底揭晓
            </p>
          </div>
          <p className="animate-in fade-in slide-in-from-bottom-2 text-lg leading-9 text-amber-100 duration-700 motion-reduce:animate-none">
            {story.bottom}
          </p>
        </section>

        {history.length > 0 && (
          <section className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-5 backdrop-blur-[2px]">
            <h2 className="text-lg font-semibold">对话回顾</h2>
            <div className="mt-4 max-h-[360px] space-y-3 overflow-y-auto pr-1">
              {history.map((message, index) => (
                <Message key={`${message.role}-${index}`} message={message} />
              ))}
            </div>
          </section>
        )}

        <div>
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-rose-700 px-5 py-2.5 text-sm font-medium text-rose-50 transition hover:scale-[1.02] hover:bg-rose-600"
          >
            再来一局
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ResultPage;
