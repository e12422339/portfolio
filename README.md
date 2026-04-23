# 資產管理 App — iOS PWA 部署說明

## 📱 安裝成 iPhone App（3 步驟）

### 方法一：GitHub Pages（免費，推薦）

**步驟 1 — 建立 GitHub 帳號（已有帳號跳過）**
前往 https://github.com 註冊免費帳號

**步驟 2 — 上傳檔案**
1. 登入 GitHub 後點右上角「+」→「New repository」
2. Repository name 填入：`portfolio`
3. 選「Public」，點「Create repository」
4. 點「uploading an existing file」
5. 把這個資料夾裡的**所有檔案**一次全選拖進去：
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `.nojekyll`
6. 點「Commit changes」

**步驟 3 — 開啟 GitHub Pages**
1. 進入 repository 頁面，點上方「Settings」
2. 左側選「Pages」
3. Source 選「Deploy from a branch」
4. Branch 選「main」，資料夾選「/ (root)」
5. 點「Save」，等約 1 分鐘

**你的 App 網址會是：**
```
https://你的帳號名稱.github.io/portfolio/
```

**步驟 4 — iPhone 安裝**
1. 用 Safari 打開上面的網址
2. 點下方工具列的 ⬆️ 分享按鈕
3. 選「加入主畫面」
4. 確認名稱「資產管理」，點「新增」
5. 完成！主畫面出現 App 圖示 📊

---

## 🗂 檔案說明

| 檔案 | 說明 |
|------|------|
| `index.html` | 主應用程式（所有功能都在這裡） |
| `manifest.json` | PWA 設定（App 名稱、圖示、顯示方式） |
| `sw.js` | Service Worker（離線快取） |
| `icon-192.png` | App 圖示 192×192 |
| `icon-512.png` | App 圖示 512×512 |
| `.nojekyll` | GitHub Pages 設定（必要） |

---

## ✅ 功能特色

- 📊 **持倉總覽**：卡片式顯示，即時股價更新
- 🏦 **股票質押**：維持率追蹤，補股/還款提醒
- 📋 **歷史損益**：完整交易紀錄，勝率統計
- 🏷 **分類管理**：自訂分類顏色
- 📥📤 **Excel 匯出/匯入**
- 🌐 **TWSE MIS 即時股價**
- 📴 **離線可用**（Service Worker 快取）
