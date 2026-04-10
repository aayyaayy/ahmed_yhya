# محمل الفيديوهات الذكي

تطبيق لتحميل الفيديوهات من YouTube وTikTok وInstagram

## التقنيات

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + Node.js
- **API**: Cobalt API

## التثبيت والتشغيل

### المتطلبات
- Node.js 18+
- npm أو pnpm

### خطوات التثبيت

```bash
# تثبيت المكتبات
npm install
```

### تشغيل المشروع (نافذتان)

```bash
# نافذة 1 — الخادم
npm run dev:server

# نافذة 2 — الواجهة
npm run dev
```

افتح المتصفح على: **http://localhost:5173**

## بنية المشروع

```
├── client/
│   ├── src/
│   │   ├── components/   مكونات React
│   │   ├── pages/        الصفحات
│   │   └── lib/          أدوات مساعدة
│   └── index.html
├── server.ts             خادم Express
├── vite.config.ts
└── package.json
```

## المطور

Ahmed Yahya — https://github.com/aayyaayy
