import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-8">환영합니다! 👋</h1>
        <p className="text-xl text-gray-300 mb-12">
          관리자 페이지로 이동하세요
        </p>
        <Link
          href="/admin/users"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
        >
          관리자 페이지로 이동 →
        </Link>
      </div>
    </div>
  );
}
