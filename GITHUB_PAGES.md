# GitHub Pages 部署指南

此專案已設定為部署至 **https://telfordho.github.io/**。由於倉庫名稱是 `telfordho.github.io`，Vite 的 `base` 使用根目錄 `/`，而 `deploy` 指令會將純靜態網站發佈至 `gh-pages` 分支。

## 一次性啟用 GitHub Pages

首先確認本地變更已推送到 GitHub 的 `main` 分支。接著，在 GitHub 開啟 `telfordho/telfordho.github.io`，前往 **Settings → Pages**，於 **Build and deployment** 選擇 **Deploy from a branch**，再選擇 **gh-pages** 分支及 `/(root)` 資料夾，最後按 **Save**。

## 日後發布

每次更新作品集後，在專案根目錄執行：

```bash
pnpm deploy
```

指令會先執行純靜態 Vite 建置，然後以 `gh-pages` 套件把 `dist/public` 發佈至 `gh-pages` 分支。GitHub Pages 通常需要數十秒至數分鐘更新。

## 注意事項

這個版本已把主視覺、結他、山景與 favicon 改為公開 CDN 圖像，不再依賴平台專用的 `/manus-storage` 路徑，因此可由 GitHub Pages 直接載入。請勿將 `.manus-logs`、`dist` 或本地圖片檔手動提交到網站根目錄。
