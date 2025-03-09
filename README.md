# Mind Mapper

基于 DIFY API 的智能思维导图生成工具。该工具可以自动将文本内容转换为结构化的思维导图，帮助用户更好地理解和组织信息。

## 功能特点

- 🤖 智能文本分析：利用 DIFY API 智能分析文本内容
- 🌲 自动生成思维导图：将文本转换为层次分明的思维导图结构
- 🎨 美观的可视化展示：使用现代化的 UI 组件展示思维导图
- 🔄 多种输入支持：
  - 文本输入：直接输入或粘贴文本内容
  - URL 解析：自动提取网页内容
  - YouTube 视频：分析视频内容（计划中）

## 技术栈

- **前端框架**: Next.js
- **UI 组件**: Shadcn UI
- **类型检查**: TypeScript
- **样式方案**: Tailwind CSS
- **API 集成**: DIFY API
- **思维导图渲染**: Mermaid.js

## 快速开始

1. 克隆项目
```bash
git clone https://github.com/randyluo85/Mind_Mapper_Dify.git
cd Mind_Mapper_Dify
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑 .env.local 文件，填入您的 DIFY API 配置
DIFY_API_KEY=your-api-key-here
DIFY_API_BASE_URL=http://your-dify-server:port
```

4. 启动开发服务器
```bash
npm run dev
```

5. 访问应用
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
Mind_Mapper_Dify/
├── app/                    # Next.js 应用目录
│   ├── config/            # 配置文件
│   ├── services/          # API 服务
│   └── types/             # TypeScript 类型定义
├── components/            # React 组件
├── public/               # 静态资源
└── ...配置文件
```

## 最近更新

### 特性分支：feature/dify-integration

- ✨ 集成 DIFY API
  - 添加安全的环境变量配置
  - 实现 API 服务封装
  - 添加类型定义
  
- 🔒 安全性改进
  - 使用环境变量管理敏感信息
  - 添加 .env.example 模板
  - 更新 .gitignore 配置

- 🏗️ 代码结构优化
  - 添加配置管理模块
  - 优化 API 调用逻辑
  - 改进错误处理

## 开发指南

### API 响应格式

思维导图数据使用以下 JSON 格式：

```typescript
interface NodeData {
  id: string;          // 节点唯一标识
  label: string;       // 节点标题
  children?: NodeData[]; // 子节点数组
  details?: string[];   // 节点详细信息
}
```

### 分支管理

- `main`: 主分支，包含稳定版本代码
- `feature/dify-integration`: DIFY API 集成分支

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的改动 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件
