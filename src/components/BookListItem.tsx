import React from 'react';
import { Book } from '../types/book';

interface BookListItemProps {
  book: Book;
}

const BookListItem: React.FC<BookListItemProps> = ({ book }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  // 格式化数字显示，将 1m 转为 1000k
  const formatNumber = (numberStr: string) => {
    // 移除 " ratings" 后缀
    const cleanNumber = numberStr.replace(/ ratings?/g, '');
    
    // 如果包含 "m"，转换为 "k" 格式
    if (cleanNumber.includes('m')) {
      const num = parseFloat(cleanNumber.replace('m', ''));
      return `${Math.round(num * 1000)}k`;
    }
    
    return cleanNumber;
  };
  
  // 更智能的判断是否需要展开按钮
  const calculateTextNeedsExpansion = (text: string | undefined) => {
    // 安全检查：如果文本不存在，不需要展开按钮
    if (!text) {
      return false;
    }
    
    // 估算中文字符的显示行数
    // 中文字符较宽，每行大约可显示25-30个字符（移动端）
    // 6行大约可显示150-180个中文字符
    const chineseCharCount = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const otherCharCount = text.length - chineseCharCount;
    
    // 中文字符按1.5倍权重计算，其他字符按1倍
    const weightedLength = chineseCharCount * 1.5 + otherCharCount;
    
    // 移动端阈值更低，桌面端阈值更高
    return weightedLength > 180;
  };
  
  const shouldShowExpandButton = calculateTextNeedsExpansion(book.description_review);

  // 生成星级图标
  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <span key={index} className="text-yellow-400">★</span>;
          } else if (index === fullStars && hasHalfStar) {
            return <span key={index} className="text-yellow-400">☆</span>;
          } else {
            return <span key={index} className="text-gray-300">☆</span>;
          }
        })}
        <span className="ml-2 text-sm font-semibold text-gray-700">{rating}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row">
        {/* 左侧：封面图片和排名 */}
        <div className="relative w-full lg:w-48 h-60 lg:h-72 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-l-lg lg:rounded-l-lg lg:rounded-r-none overflow-hidden">
          <img
            src={book.goodreads_cover_link}
            alt={`${book.title_zh} cover`}
            className="w-full h-full object-contain bg-white"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YWFhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIENvdmVyPC90ZXh0Pjwvc3ZnPg==';
            }}
          />
          {/* 排名标签 */}
          <div className="absolute top-2 left-2 bg-book-brown text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
            {book.rank}
          </div>
        </div>

        {/* 右侧：书籍信息 */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col">
          {/* 移动端：标题和评分水平排列 */}
          <div className="lg:hidden mb-4">
            <div className="flex gap-3 mb-3">
              {/* 左侧：标题信息 */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {book.title_zh}
                </h3>
                <p className="text-sm text-gray-600 italic mb-2 line-clamp-1">
                  {book.original_title}
                </p>
                <p className="text-sm text-book-brown font-semibold">
                  {book.author}
                </p>
              </div>
              
              {/* 右侧：评分区域 */}
              <div className="flex-shrink-0 w-20">
                <div className="bg-yellow-50 px-2 py-2 rounded-lg border border-yellow-200 text-center">
                  <div className="text-xs text-gray-600 font-medium mb-1">Goodreads评分</div>
                  <div className="flex items-center justify-center mb-1 flex-wrap">
                    {[...Array(5)].map((_, index) => {
                      const rating = parseFloat(book.rating);
                      const fullStars = Math.floor(rating);
                      const hasHalfStar = rating % 1 >= 0.5;
                      
                      if (index < fullStars) {
                        return <span key={index} className="text-yellow-400 text-xs">★</span>;
                      } else if (index === fullStars && hasHalfStar) {
                        return <span key={index} className="text-yellow-400 text-xs">☆</span>;
                      } else {
                        return <span key={index} className="text-gray-300 text-xs">☆</span>;
                      }
                    })}
                  </div>
                  <div className="text-xs font-semibold text-gray-700">{book.rating}</div>
                </div>
              </div>
            </div>
            
            {/* 移动端：统计信息 */}
            <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              <span className="flex items-center">
                <span className="mr-1 text-sm">👥</span>
                <span>{formatNumber(book.ratings_count)}</span>
              </span>

            </div>
          </div>

          {/* 桌面端：原有布局 */}
          <div className="hidden lg:block">
            {/* 标题区域 */}
            <div className="mb-4">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                {book.title_zh}
              </h3>
              <p className="text-base lg:text-lg text-gray-600 italic mb-2">
                {book.original_title}
              </p>
              <p className="text-base lg:text-lg text-book-brown font-semibold">
                {book.author}
              </p>
            </div>

            {/* 评分和统计信息 */}
            <div className="mb-4">
              <div className="flex flex-wrap items-center gap-4 mb-3">
                {/* 评分区域 */}
                <div className="bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                  <div className="text-xs text-gray-600 font-medium mb-1">Goodreads评分</div>
                  {renderStars(book.rating)}
                </div>
                
                {/* 统计信息 */}
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <span className="mr-2 text-lg">👥</span>
                    <div>
                      <div className="font-semibold text-sm">{formatNumber(book.ratings_count)}</div>
                      <div className="text-xs text-gray-500">评分人数</div>
                    </div>
                  </span>

                </div>
              </div>
            </div>
          </div>

          {/* 描述 */}
          <div className="flex-1 mb-4">
            <div className="text-sm text-gray-600 font-medium mb-2">内容简介</div>
            <div className="relative">
              {book.description_review ? (
                <>
                  <p 
                    className={`text-gray-700 leading-relaxed text-sm transition-all duration-300 ${
                      isExpanded ? '' : 'line-clamp-6'
                    }`}
                  >
                    {book.description_review}
                  </p>
                  {shouldShowExpandButton && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-2 text-book-brown text-sm font-medium hover:text-book-brown/80 transition-colors duration-200 flex items-center"
                    >
                      {isExpanded ? (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                          收起
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          展开全部
                        </>
                      )}
                    </button>
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-sm italic">暂无内容简介</p>
              )}
            </div>
          </div>

                                            {/* 操作按钮 */}
                  <div className="flex justify-end">
                    <a
                      href={book.goodreads_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 bg-book-brown text-white text-xs lg:text-sm font-medium rounded-md hover:bg-opacity-90 transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      <span className="hidden sm:inline">查看详情</span>
                      <span className="sm:hidden">详情</span>
                    </a>
                  </div>
        </div>
      </div>
    </div>
  );
};

export default BookListItem;
