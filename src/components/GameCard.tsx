import { Link } from "react-router-dom";
import type { Story } from "../data/stories";

interface GameCardProps {
  story: Story;
}

const difficultyStyleMap: Record<Story["difficulty"], string> = {
  easy: "border border-emerald-500/35 bg-emerald-500/10 text-emerald-200",
  medium: "border border-amber-500/35 bg-amber-500/10 text-amber-200",
  hard: "border border-rose-500/35 bg-rose-500/10 text-rose-200",
};

const difficultyLabelMap: Record<Story["difficulty"], string> = {
  easy: "简单",
  medium: "中等",
  hard: "困难",
};

function GameCard({ story }: GameCardProps) {
  return (
    <Link
      to={`/game/${story.id}`}
      className="group relative block overflow-hidden rounded-xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(33,25,22,0.82),rgba(17,18,23,0.88))] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-rose-400/70 hover:shadow-lg hover:shadow-rose-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(185,28,28,0.14),transparent_35%),radial-gradient(circle_at_0%_100%,rgba(71,85,105,0.16),transparent_40%)] opacity-80 transition group-hover:opacity-100" />
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="line-clamp-1 text-lg font-semibold text-slate-100 transition group-hover:text-rose-100">
          {story.title}
        </h3>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-[1px] ${difficultyStyleMap[story.difficulty]}`}
        >
          {difficultyLabelMap[story.difficulty]}
        </span>
      </div>
      <p className="line-clamp-2 text-sm leading-6 text-slate-300/95">
        {story.surface}
      </p>
      <p className="mt-4 text-xs tracking-[0.08em] text-slate-400 transition group-hover:text-rose-200">
        点击开始推理
      </p>
    </Link>
  );
}

export default GameCard;
