import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "offline.html", // 👈 ADD THIS BACK
        "icons/icon-192x192.png",
        "icons/icon-512x512.png",
      ],
      manifest: {
        name: "Weather App",
        short_name: "WeatherApp",
        description:
          "A React Weather App with geolocation, voice search, and comparison features.",
        theme_color: "#0f172a",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "screenshots/mobile.png",
            sizes: "375x666",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile view of Weather App",
          },
          {
            src: "screenshots/desktop.png",
            sizes: "1912x984",
            type: "image/png",
            form_factor: "wide",
            label: "Desktop view of Weather App",
          },
        ],
      },
      workbox: {
        navigateFallback: "/offline.html",
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "weather-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 30,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
  server: { port: 9191 },
  base: "./",
});


