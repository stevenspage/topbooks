# 📚 Goodreads 2025 Top 200 书籍展示网站

一个现代化的图书展示网站，展示Goodreads 2025年度最受欢迎的200本书籍。

## ✨ 功能特性

- 🎯 **精美展示** - 现代化的卡片式布局，展示书籍信息
- 🔍 **智能搜索** - 支持按书名、作者搜索
- ⭐ **评分筛选** - 可按评分范围筛选书籍
- 📱 **响应式设计** - 完美支持手机、平板、电脑
- 🌍 **双语支持** - 中英文标题和描述
- 🎨 **温暖配色** - 采用书籍主题的温暖米色系
- 🔄 **分类切换** - 支持非小说类和总榜切换

## 🚀 快速开始

### 本地开发

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm start
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
```

## 🌐 部署到 GitHub Pages

### 方法1：使用 gh-pages 包（推荐）

1. 安装 gh-pages
```bash
npm install --save-dev gh-pages
```

2. 在 `package.json` 中添加部署脚本
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. 部署到 GitHub Pages
```bash
npm run deploy
```

### 方法2：手动部署

1. 构建项目
```bash
npm run build
```

2. 将 `build` 文件夹内容推送到 GitHub 仓库的 `gh-pages` 分支

3. 在 GitHub 仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支作为源

## 🛠 技术栈

- **前端框架**: React 18 + TypeScript
- **样式系统**: Tailwind CSS
- **构建工具**: Create React App
- **字体**: Inter (Google Fonts)
- **图标**: Emoji + CSS

## 📁 项目结构

```
src/
├── components/          # React 组件
│   ├── Header.tsx      # 网站头部
│   ├── BookCard.tsx    # 书籍卡片
│   ├── BookListItem.tsx # 书籍列表项
│   ├── CategorySwitch.tsx # 分类切换
│   └── SearchAndFilter.tsx # 搜索和筛选
├── types/              # TypeScript 类型定义
│   └── book.ts         # 书籍数据类型
├── data/               # 数据文件
│   ├── book_info_non_fiction.json  # 非小说类数据
│   └── book_info_total.json        # 总榜数据
├── App.tsx             # 主应用组件
└── index.css           # 全局样式
```

## 🎨 设计特色

- **温暖米色背景** (`#faf8f3`) - 像纸张一样舒适
- **深棕色强调色** (`#8b4513`) - 经典书籍色彩
- **卡片式布局** - 每本书独立展示
- **悬停效果** - 丰富的交互体验
- **响应式网格** - 自适应不同屏幕尺寸
- **双视图模式** - 网格视图和列表视图

## 📊 数据字段

网站展示以下书籍信息：
- ✅ 排名 (rank)
- ✅ 英文标题 (original_title)
- ✅ 中文标题 (title_zh)
- ✅ 作者 (author)
- ✅ 评分 (rating)
- ✅ 评分数量 (ratings_count)
- ✅ 中文描述 (description_review)
- ✅ Goodreads链接 (goodreads_link)
- ✅ 封面图片 (goodreads_cover_link)

## 🔧 自定义配置

### 修改颜色主题

在 `tailwind.config.js` 中修改自定义颜色：

```javascript
colors: {
  'book-warm': '#faf8f3',    // 主背景色
  'book-brown': '#8b4513',   // 强调色
  'book-cream': '#fff8dc',   // 奶油色
  'book-paper': '#f5f5dc',  // 纸张色
}
```

### 修改字体

在 `src/index.css` 中导入其他Google字体：

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');
```

## 📱 响应式断点

- **手机**: < 640px (1列布局)
- **平板**: 641px - 1024px (2列布局)
- **小屏电脑**: 1025px - 1279px (3列布局)
- **大屏电脑**: ≥ 1280px (4列布局)

## 🚀 性能优化

- 使用 `useMemo` 优化搜索和筛选性能
- 图片懒加载和错误处理
- CSS 动画使用 `transform` 而非 `position` 属性
- 响应式图片加载

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**享受阅读的乐趣！** 📖✨
