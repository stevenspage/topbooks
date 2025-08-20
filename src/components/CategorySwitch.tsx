import React from 'react';

export type DataSource = 'non_fiction' | 'total';

interface CategorySwitchProps {
  currentCategory: DataSource;
  onCategoryChange: (category: DataSource) => void;
}

const CategorySwitch: React.FC<CategorySwitchProps> = ({
  currentCategory,
  onCategoryChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onCategoryChange('non_fiction')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              currentCategory === 'non_fiction'
                ? 'bg-book-brown text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center">
              <span className="mr-2">📚</span>
              非小说类
            </span>
          </button>
          <button
            onClick={() => onCategoryChange('total')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              currentCategory === 'total'
                ? 'bg-book-brown text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center">
              <span className="mr-2">🏆</span>
              总榜
            </span>
          </button>
        </div>
      </div>
      
      {/* 分类说明 */}
      <div className="text-center mt-2">
        <p className="text-sm text-gray-500">
          {currentCategory === 'non_fiction' 
            ? '当前显示：Goodreads 2025 非小说类 Top 200'
            : '当前显示：Goodreads 2025 总榜 Top 200'
          }
        </p>
      </div>
    </div>
  );
};

export default CategorySwitch;
