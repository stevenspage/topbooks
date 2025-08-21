import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SearchAndFilter from './components/SearchAndFilter';
import BookCard from './components/BookCard';
import BookListItem from './components/BookListItem';
import CategorySwitch, { DataSource } from './components/CategorySwitch';
import { Book, BookData } from './types/book';
import nonFictionData from './data/book_info_non_fiction.json';
import totalData from './data/book_info_total.json';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [dataSource, setDataSource] = useState<DataSource>('non_fiction');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // 获取当前数据源
  const getCurrentBookData = () => {
    return dataSource === 'non_fiction' ? nonFictionData : totalData;
  };

  useEffect(() => {
    // 模拟数据加载
    setLoading(true);
    setTimeout(() => {
      const currentData = dataSource === 'non_fiction' ? nonFictionData : totalData;
      setBooks((currentData as BookData).books);
      setLoading(false);
    }, 300);
  }, [dataSource]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 过滤和排序逻辑
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      // 安全检查：确保所有必需字段都存在
      if (!book.title_zh || !book.original_title || !book.author || !book.rating || !book.ratings_count) {
        return false;
      }
      
      const matchesSearch = 
        book.title_zh.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.original_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRating = !ratingFilter || parseFloat(book.rating) >= parseFloat(ratingFilter);
      
      // 按评分排序时，过滤掉评分人数少于100人的书籍
      const hasEnoughRatings = sortBy !== 'rating' || parseInt(book.ratings_count.replace(/[^\d]/g, '')) >= 100;
      
      return matchesSearch && matchesRating && hasEnoughRatings;
    });

    // 排序逻辑
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        case 'ratings_count':
          // 按评分人数排序，需要先转换为数字进行比较
          // 处理 N/A 和无效值，将它们排在最后
          const ratingsCountA = a.ratings_count === 'N/A' || !a.ratings_count ? 0 : parseInt(a.ratings_count.replace(/[^\d]/g, ''));
          const ratingsCountB = b.ratings_count === 'N/A' || !b.ratings_count ? 0 : parseInt(b.ratings_count.replace(/[^\d]/g, ''));
          
          // 如果两个都是 N/A 或无效值，保持原有顺序
          if (ratingsCountA === 0 && ratingsCountB === 0) {
            return 0;
          }
          
          // 如果只有一个是 N/A 或无效值，将有效值排在前面
          if (ratingsCountA === 0) return 1;
          if (ratingsCountB === 0) return -1;
          
          // 正常数字比较，降序排列
          return ratingsCountB - ratingsCountA;
        case 'title':
          return (a.title_zh || '').localeCompare(b.title_zh || '', 'zh-CN');
        case 'author':
          return (a.author || '').localeCompare(b.author || '', 'zh-CN');
        default: // rank
          const rankA = parseInt((a.rank || '0').replace('#', ''));
          const rankB = parseInt((b.rank || '0').replace('#', ''));
          return rankA - rankB;
      }
    });

    return filtered;
  }, [books, searchTerm, ratingFilter, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-book-warm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-book-brown mx-auto mb-4"></div>
          <p className="text-xl text-book-brown">正在加载书籍数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-book-warm">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CategorySwitch
          currentCategory={dataSource}
          onCategoryChange={setDataSource}
        />
        
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          ratingFilter={ratingFilter}
          onRatingFilterChange={setRatingFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />

        {/* 视图切换和结果统计 */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          {/* 结果统计 */}
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <p className="text-lg text-gray-600">
              找到 <span className="font-bold text-book-brown">{filteredAndSortedBooks.length}</span> 本书
              {searchTerm && ` (搜索: "${searchTerm}")`}
              {ratingFilter && ` (评分 ≥ ${ratingFilter})`}
            </p>
          </div>

          {/* 视图切换按钮 */}
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'grid'
                  ? 'bg-book-brown text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                网格视图
              </span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'list'
                  ? 'bg-book-brown text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                列表视图
              </span>
            </button>
          </div>
        </div>

        {/* 书籍展示区域 */}
        {filteredAndSortedBooks.length > 0 ? (
          viewMode === 'grid' ? (
            // 网格视图 - 强制2列布局
            <div 
              className="w-full"
              style={{
                display: 'grid',
                gridTemplateColumns: windowWidth < 768 ? 'repeat(2, 1fr)' : 
                                   windowWidth < 1024 ? 'repeat(3, 1fr)' : 
                                   windowWidth < 1280 ? 'repeat(4, 1fr)' : 'repeat(5, 1fr)',
                gap: windowWidth < 768 ? '8px' : '16px'
              }}
            >
              {filteredAndSortedBooks.map((book, index) => (
                <div key={`${book.rank}-${index}`} className="w-full">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          ) : (
            // 列表视图
            <div className="space-y-4">
              {filteredAndSortedBooks.map((book, index) => (
                <BookListItem key={`${book.rank}-${index}`} book={book} />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">没有找到相关书籍</h3>
            <p className="text-gray-500">请尝试调整搜索条件或筛选器</p>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2">
            📚 Goodreads 2025 Top 200 书籍展示网站
          </p>
          <p className="text-sm text-gray-500">
            数据来源: Goodreads | 最后更新: {getCurrentBookData().last_updated}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
