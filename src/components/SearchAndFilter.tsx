import React from 'react';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  ratingFilter: string;
  onRatingFilterChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  ratingFilter,
  onRatingFilterChange,
  sortBy,
  onSortByChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 搜索框 */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            搜索书籍
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="输入书名、作者..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-book-brown focus:border-transparent"
          />
        </div>

        {/* 评分筛选 */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
            最低评分
          </label>
          <select
            id="rating"
            value={ratingFilter}
            onChange={(e) => onRatingFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-book-brown focus:border-transparent"
          >
            <option value="">全部评分</option>
            <option value="4.5">4.5+ ⭐</option>
            <option value="4.0">4.0+ ⭐</option>
            <option value="3.5">3.5+ ⭐</option>
            <option value="3.0">3.0+ ⭐</option>
          </select>
        </div>

        {/* 排序方式 */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
            排序方式
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-book-brown focus:border-transparent"
          >
            <option value="rank">综合排名</option>
            <option value="rating">按评分</option>
            <option value="title">按书名</option>
            <option value="author">按作者</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
