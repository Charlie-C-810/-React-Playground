import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // 生产环境汉化
  ],
  resolve: {
    alias: {// 将 '@' 映射到 'src' 目录
      '@': path.resolve(__dirname, './src'),
    }
  }
});
