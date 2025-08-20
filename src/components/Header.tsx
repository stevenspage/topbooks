import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-book-brown to-book-brown/80 text-white shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
            📚 Goodreads 2025 Top 200
          </h1>
          <p className="text-xl md:text-2xl text-book-cream font-medium">
            发现年度最受欢迎的书籍
          </p>
          <p className="text-lg text-book-cream/80 mt-2">
            Discover the Most Popular Books of 2025
          </p>
        </div>
        
        {/* 统计信息 */}
        <div className="mt-8 flex justify-center items-center gap-4 md:gap-8">
          <div className="text-center flex-1 min-w-0 max-w-24 md:max-w-none">
            <div className="text-xl md:text-3xl font-bold text-yellow-300">200</div>
            <div className="text-xs md:text-base text-book-cream">精选书籍</div>
          </div>
          <div className="text-center flex-1 min-w-0 max-w-24 md:max-w-none">
            <div className="text-xl md:text-3xl font-bold text-yellow-300">⭐</div>
            <div className="text-xs md:text-base text-book-cream">Goodreads评分</div>
          </div>
          <div className="text-center flex-1 min-w-0 max-w-24 md:max-w-none">
            <div className="text-xl md:text-3xl font-bold text-yellow-300">📖</div>
            <div className="text-xs md:text-base text-book-cream">精彩故事</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
