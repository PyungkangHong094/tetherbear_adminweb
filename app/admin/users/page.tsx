import { Users, Calendar } from "lucide-react";

// 예시 데이터
const usersData = [
  {
    id: 1,
    name: "김철수",
    email: "kim@example.com",
    phone: "010-1234-5678",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "이영희",
    email: "lee@example.com",
    phone: "010-2345-6789",
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "정민정",
    email: "jung@example.com",
    phone: "010-4567-8901",
    joinDate: "2024-01-25",
  },
  {
    id: 4,
    name: "최준호",
    email: "choi@example.com",
    phone: "010-5678-9012",
    joinDate: "2024-02-15",
  },
  {
    id: 5,
    name: "한소영",
    email: "han@example.com",
    phone: "010-6789-0123",
    joinDate: "2024-03-05",
  },
];

export default function UsersPage() {
  const totalUsers = usersData.length;
  const thisMonthUsers = 2;

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">관리자 페이지</h1>
        <p className="text-gray-600">
          사용자 정보를 관리하고 현황을 확인하세요
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* 총 사용자 수 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 text-sm">총 사용자 수</span>
            <Users className="text-gray-400" size={20} />
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">{totalUsers}명</p>
            <p className="text-sm text-gray-500 mt-1">전체 등록된 사용자</p>
          </div>
        </div>

        {/* 이번 달 가입 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 text-sm">이번 달 가입</span>
            <Calendar className="text-blue-500" size={20} />
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">
              {thisMonthUsers}명
            </p>
            <p className="text-sm text-gray-500 mt-1">2024년 3월</p>
          </div>
        </div>
      </div>

      {/* 사용자 목록 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">사용자 목록</h2>
          <p className="text-sm text-gray-600 mt-1">
            등록된 모든 사용자의 정보를 확인할 수 있습니다
          </p>
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  이메일
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  전화번호
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  가입일
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usersData.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-900">
                        {user.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">
                        {user.phone}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.joinDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
