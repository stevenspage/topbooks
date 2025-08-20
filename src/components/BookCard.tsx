import React from 'react';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col h-full w-full min-w-0">
      {/* 封面图片 - 移动端保持原比例，桌面端固定高度 */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
        <img
          src={book.goodreads_cover_link}
          alt={`${book.title_zh} cover`}
          className="w-full h-full object-contain sm:object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YWFhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIENvdmVyPC90ZXh0Pjwvc3ZnPg==';
          }}
        />
        {/* 排名标签 */}
        <div className="absolute top-2 left-2 bg-book-brown text-white px-2 py-1 rounded-full text-sm font-bold">
          {book.rank}
        </div>
      </div>

      {/* 书籍信息 - 移动端精简，桌面端保持原有布局 */}
      <div className="p-2 sm:p-3 flex flex-col flex-1">
        {/* 上半部分：标题和作者（自适应高度） */}
        <div className="flex-1 min-h-0">
          {/* 标题区域 */}
          <div className="mb-2">
            {/* 中文标题 */}
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-2 leading-tight">
              {book.title_zh}
            </h3>
            
            {/* 英文标题 - 移动端隐藏，桌面端自适应 */}
            <p className="hidden sm:block text-xs text-gray-600 italic line-clamp-2 leading-tight mb-1">
              {book.original_title}
            </p>
          </div>
          
          {/* 作者区域 */}
          <div className="mb-2">
            <p className="text-xs text-book-brown font-medium">
              {book.author}
            </p>
          </div>
        </div>
               
        {/* 评分区域 - 固定高度确保对齐 */}
        <div className="h-16 sm:h-20 mb-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200 flex-shrink-0">
          {/* 评分标题 - 移动端隐藏 */}
          <div className="hidden sm:block text-xs text-gray-600 font-medium mb-1">Goodreads评分</div>
          
          {/* 星级评分 */}
          <div className="mb-1">
            {renderStars(book.rating)}
          </div>
          
          {/* 统计信息 - 移动端简化 */}
          <div className="flex justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <span className="mr-1">👥</span>
              <span>{formatNumber(book.ratings_count)}</span>
            </span>
                         
          </div>
        </div>
        
        {/* 描述预览 - 移动端隐藏，桌面端显示 */}
        <div className="hidden sm:block mb-2">
          {book.description_review ? (
            <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
              {book.description_review}
            </p>
          ) : (
            <p className="text-xs text-gray-500 italic">暂无内容简介</p>
          )}
        </div>
               
        {/* 链接按钮 - 移动端更紧凑 */}
        <div className="h-7 sm:h-8 mt-auto">
          <a
            href={book.goodreads_link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full bg-book-brown text-white text-center py-1 px-2 rounded-md hover:bg-opacity-90 transition-colors duration-200 font-medium flex items-center justify-center text-xs"
          >
            <span className="hidden sm:inline">查看详情</span>
            <span className="sm:hidden">详情</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
