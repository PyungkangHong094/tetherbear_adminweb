"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Link as LinkIcon } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "사용자 관리",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "링크 관리",
      href: "/admin/links",
      icon: LinkIcon,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 왼쪽 네비게이션 바 */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 fixed h-full">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800">관리자 패널</h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 ml-64">{children}</main>
    </div>
  );
}
