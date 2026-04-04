import GameCard from "../components/GameCard";
import { stories } from "../data/stories";

function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090f] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_56%_10%,rgba(163,186,229,0.26),transparent_22%),radial-gradient(circle_at_0%_40%,rgba(61,29,29,0.58),transparent_42%),radial-gradient(circle_at_100%_38%,rgba(31,49,86,0.56),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,16,0.24)_0%,rgba(6,9,16,0.8)_48%,rgba(4,6,11,0.98)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.012)_0px,rgba(255,255,255,0.012)_1px,transparent_1px,transparent_3px)] opacity-80" />

      <section className="relative flex min-h-[72vh] items-end">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-[44%] bg-[radial-gradient(circle_at_100%_50%,rgba(13,13,18,0.22),rgba(3,3,5,0.97)_70%)] blur-md" />
          <div className="absolute inset-y-0 right-0 w-[44%] bg-[radial-gradient(circle_at_0%_50%,rgba(13,13,18,0.22),rgba(3,3,5,0.97)_70%)] blur-md" />
          <div className="absolute inset-x-0 top-0 h-[24%] bg-[linear-gradient(180deg,rgba(7,6,8,0.96)_0%,rgba(7,6,8,0)_100%)] blur-sm" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[12%] -translate-x-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,31,48,0.22)_0%,rgba(13,20,31,0.72)_44%,rgba(8,12,21,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(177,203,243,0.23),transparent_30%)]" />
          <div className="absolute inset-x-[15%] bottom-[14%] h-[44%] rounded-[50%] bg-black/80 blur-[1px]" />
          <div className="absolute left-1/2 top-[58%] h-24 w-10 -translate-x-1/2 rounded-t-[32px] bg-black/80 shadow-[0_0_70px_rgba(0,0,0,0.88)]" />
          <div className="absolute left-1/2 top-[67%] h-14 w-14 -translate-x-1/2 rounded-full bg-black/80" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 sm:pb-20">
          <p className="text-xs uppercase tracking-[0.34em] text-slate-400">
            victorian castle - midnight
          </p>
          <h1 className="mt-3 bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            AI海龟汤
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            从破旧衣柜缝隙中，你看到古堡长廊深处有个老管家。它不说话，也不靠近，
            只是静静站在那里。你每问一个问题，黑暗就向你走近一步。
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/36 p-4 shadow-2xl shadow-black/40 backdrop-blur-[2px] sm:p-5">
          <div className="mb-4 flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-rose-500/80" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-slate-500/80" />
            <span className="ml-2 tracking-[0.18em] uppercase">story chamber</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stories.map((story) => (
              <GameCard key={story.id} story={story} />
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs tracking-[0.14em] text-slate-500">
          TIP: 在古堡里，最可怕的从来不是黑夜，而是答案。
        </p>
      </section>
    </main>
  );
}

export default HomePage;
