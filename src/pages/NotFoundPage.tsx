import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-slate-100">
      <section className="text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">404</p>
        <h1 className="mt-3 text-4xl font-bold">页面不存在</h1>
        <p className="mt-4 text-slate-300">你访问的页面可能已删除或路径错误。</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-400"
        >
          返回首页
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
