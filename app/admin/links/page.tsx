"use client";

import { useState } from "react";
import {
  Link as LinkIcon,
  ExternalLink,
  Edit,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";

// 링크 타입 정의
type LinkType = {
  id: number;
  title: string;
  url: string;
  category: string;
  status: string;
  banner: string;
  registeredDate: string;
};

// 예시 데이터
const initialLinksData: LinkType[] = [
  {
    id: 1,
    title: "ChartQ 카카오톡 오픈채팅",
    url: "https://open.kakao.com/og/BBAfVXh",
    category: "Forex",
    status: "활성",
    banner: "https://via.placeholder.com/80x60/FF69B4/FFFFFF?text=ChartQ",
    registeredDate: "2024-03-15",
  },
  {
    id: 2,
    title: "공식 블로그",
    url: "https://blog.example.com",
    category: "Crypto",
    status: "활성",
    banner: "https://via.placeholder.com/80x60/4169E1/FFFFFF?text=Blog",
    registeredDate: "2024-03-10",
  },
  {
    id: 3,
    title: "고객 지원",
    url: "https://support.example.com",
    category: "Plarform",
    status: "비활성",
    banner: "https://via.placeholder.com/80x60/808080/FFFFFF?text=Support",
    registeredDate: "2024-03-05",
  },
];

export default function LinksPage() {
  const [linksData, setLinksData] = useState(initialLinksData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkType | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const totalLinks = linksData.length;
  const activeLinks = linksData.filter((link) => link.status === "활성").length;
  const inactiveLinks = linksData.filter(
    (link) => link.status === "비활성"
  ).length;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingLink(null);
    setTitle("");
    setUrl("");
    setCategory("");
    setImageFile(null);
    setImagePreview("");
    setIsModalOpen(true);
  };

  const openEditModal = (link: LinkType) => {
    setEditingLink(link);
    setTitle(link.title);
    setUrl(link.url);
    setCategory(link.category);
    setImagePreview(link.banner);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (editingLink) {
      // 수정 모드
      const updatedLinks = linksData.map((link) =>
        link.id === editingLink.id
          ? {
              ...link,
              title,
              url,
              category,
              banner: imagePreview || link.banner,
            }
          : link
      );
      setLinksData(updatedLinks);
      console.log("링크 수정:", { id: editingLink.id, title, url, category });
    } else {
      // 추가 모드
      const newLink: LinkType = {
        id: linksData.length + 1,
        title,
        url,
        category,
        status: "활성",
        banner:
          imagePreview ||
          "https://via.placeholder.com/80x60/808080/FFFFFF?text=New",
        registeredDate: new Date().toISOString().split("T")[0],
      };
      setLinksData([...linksData, newLink]);
      console.log("새 링크 추가:", newLink);
    }

    setIsModalOpen(false);
    setTitle("");
    setUrl("");
    setCategory("");
    setImageFile(null);
    setImagePreview("");
    setEditingLink(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("정말 이 링크를 삭제하시겠습니까?")) {
      setLinksData(linksData.filter((link) => link.id !== id));
      console.log("링크 삭제:", id);
    }
  };

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">링크 관리</h1>
          <p className="text-gray-600">외부 링크를 추가하고 관리하세요</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          <span>링크 추가</span>
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 text-sm">총 링크 수</span>
            <ExternalLink className="text-gray-400" size={20} />
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">{totalLinks}개</p>
            <p className="text-sm text-gray-500 mt-1">등록된 전체 링크</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 text-sm">활성 링크</span>
            <ExternalLink className="text-green-500" size={20} />
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600">{activeLinks}개</p>
            <p className="text-sm text-gray-500 mt-1">현재 활성 상태</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 text-sm">비활성 링크</span>
            <ExternalLink className="text-red-500" size={20} />
          </div>
          <div>
            <p className="text-4xl font-bold text-red-600">{inactiveLinks}개</p>
            <p className="text-sm text-gray-500 mt-1">비활성 상태</p>
          </div>
        </div>
      </div>

      {/* 링크 목록 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">링크 목록</h2>
          <p className="text-sm text-gray-600 mt-1">
            등록된 모든 외부 링크를 관리할 수 있습니다
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  배너
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  등록일
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {linksData.map((link) => (
                <tr
                  key={link.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-20 h-14 bg-gray-100 rounded overflow-hidden relative">
                      <Image
                        src={link.banner}
                        alt={link.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ExternalLink size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {link.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      {link.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {link.url}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        link.status === "활성"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {link.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {link.registeredDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(link)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 링크 추가/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg relative">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            {/* 모달 헤더 */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {editingLink ? "링크 수정" : "새 링크 추가"}
            </h2>
            <p className="text-gray-600 mb-6">
              {editingLink
                ? "링크 정보를 수정하세요."
                : "새로운 외부 링크를 추가하세요."}
            </p>

            {/* 제목 입력 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="링크 제목을 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* 카테고리 입력 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="예: Forex, Crypto, Plarform"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* URL 입력 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* 배너 이미지 업로드 */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                배너 이미지
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-24 relative mb-4">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <p className="text-sm text-gray-600">클릭하여 변경</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="text-gray-400 mb-3" size={40} />
                      <p className="text-gray-600 font-medium mb-1">
                        클릭하여 업로드 또는 드래그 앤 드롭
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, GIF (최대 10MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {editingLink ? "수정" : "추가"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
