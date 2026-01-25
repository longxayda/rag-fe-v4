import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Di sản Văn hóa Cà Mau',
        short_name: 'Di sản Cà Mau',
        description: 'Cổng thông tin di sản văn hóa tỉnh Cà Mau',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // QUAN TRỌNG: Chỉ cache các file tĩnh thông thường
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        
        // Bỏ qua các file trong thư mục audio khi điều hướng
        navigateFallbackDenylist: [/^\/audio\//],
        
        // Cấu hình chiến lược cache:
        // File âm thanh (.wav, .mp3) sẽ dùng NetworkOnly (không cache) để tránh lỗi 206
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/audio/') || /\.(wav|mp3)$/i.test(url.pathname),
            handler: 'NetworkOnly',
          },
          {
            // Cache hình ảnh (CacheFirst)
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 ngày
              },
            },
          },
          {
            // Cache Font chữ, CSS, JS (StaleWhileRevalidate)
            urlPattern: ({ request }) => 
              request.destination === 'script' ||
              request.destination === 'style' || 
              request.destination === 'font',
            handler: 'StaleWhileRevalidate',
          }
        ]
      }
    })
  ],
  base: '/',
})
