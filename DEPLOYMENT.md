# 🚀 部署到 GitHub Pages 详细指南

## 📋 前置要求

1. 确保您有一个 GitHub 账户
2. 确保您的电脑已安装 Git
3. 确保您的电脑已安装 Node.js (版本 16+)

## 🔧 步骤 1: 创建 GitHub 仓库

1. 登录 GitHub，点击右上角的 "+" 号，选择 "New repository"
2. 仓库名称填写: `goodreads-2025`
3. 选择 "Public" (公开)
4. 不要勾选 "Add a README file" (我们已经有了)
5. 点击 "Create repository"

## 🔧 步骤 2: 配置项目

### 2.1 更新 homepage 字段

在 `package.json` 文件中，将 `homepage` 字段更新为您的实际 GitHub 用户名：

```json
{
  "homepage": "https://您的用户名.github.io/goodreads-2025"
}
```

**重要**: 请将 `您的用户名` 替换为您的实际 GitHub 用户名！

### 2.2 初始化 Git 仓库

```bash
# 在项目根目录下执行
git init
git add .
git commit -m "Initial commit: Goodreads 2025 Top 200 网站"
```

### 2.3 添加远程仓库

```bash
git remote add origin https://github.com/您的用户名/goodreads-2025.git
git branch -M main
git push -u origin main
```

## 🚀 步骤 3: 部署到 GitHub Pages

### 方法 1: 使用 npm 脚本 (推荐)

```bash
npm run deploy
```

这个命令会自动：
1. 构建项目 (`npm run build`)
2. 将构建结果推送到 `gh-pages` 分支
3. 部署到 GitHub Pages

### 方法 2: 手动部署

```bash
# 1. 构建项目
npm run build

# 2. 安装 gh-pages (如果还没安装)
npm install --save-dev gh-pages

# 3. 部署
npx gh-pages -d build
```

## ⚙️ 步骤 4: 配置 GitHub Pages

1. 在您的 GitHub 仓库页面，点击 "Settings" 标签
2. 在左侧菜单中找到 "Pages"
3. 在 "Source" 部分，选择 "Deploy from a branch"
4. 在 "Branch" 下拉菜单中选择 `gh-pages`，文件夹选择 `/ (root)`
5. 点击 "Save"

## 🌐 步骤 5: 访问您的网站

等待几分钟后，您的网站将在以下地址可用：

```
https://您的用户名.github.io/goodreads-2025
```

## 🔄 更新网站

每次您修改代码后，需要重新部署：

```bash
# 提交代码更改
git add .
git commit -m "更新描述"
git push origin main

# 重新部署
npm run deploy
```

## 🐛 常见问题解决

### 问题 1: 构建失败

**错误**: `Module not found: Can't resolve './data/book_info.json'`

**解决方案**: 确保 `src/data/` 目录下有 `book_info.json` 文件

### 问题 2: 样式不生效

**错误**: Tailwind CSS 样式没有加载

**解决方案**: 
1. 检查 `tailwind.config.js` 文件是否正确
2. 确保 `src/index.css` 包含了 Tailwind 指令
3. 重新构建项目

### 问题 3: 图片不显示

**错误**: 书籍封面图片无法加载

**解决方案**: 
- 检查网络连接
- 图片链接可能已过期，这是正常的
- 网站会自动显示默认的占位图片

### 问题 4: 部署后页面空白

**错误**: 部署成功但页面显示空白

**解决方案**:
1. 检查 `homepage` 字段是否正确
2. 确保构建成功 (`npm run build`)
3. 等待几分钟让 GitHub Pages 生效

## 📱 测试响应式设计

部署成功后，请在不同设备上测试：

- 📱 手机 (320px - 768px)
- 📱 平板 (768px - 1024px)
- 💻 电脑 (1024px+)

## 🎯 性能优化建议

1. **图片优化**: 考虑使用 WebP 格式或图片压缩
2. **代码分割**: 如果网站变大，可以考虑代码分割
3. **缓存策略**: 利用 GitHub Pages 的 CDN 缓存

## 🔗 有用的链接

- [GitHub Pages 官方文档](https://pages.github.com/)
- [React 部署指南](https://create-react-app.dev/docs/deployment/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 📞 获取帮助

如果遇到问题：

1. 检查 GitHub Actions 日志
2. 查看浏览器控制台错误
3. 在 GitHub Issues 中搜索类似问题
4. 创建新的 Issue 描述您的问题

---

**祝您部署顺利！** 🎉
