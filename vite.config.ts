import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const aliasPath = (path: string) => resolve(__dirname, path)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': aliasPath('src'),
      comps: resolve('src/components'),
      services: resolve('src/services'),
      pages: resolve('src/pages'),
      utils: resolve('src/utils'),
      routes: resolve('src/routes'),
      types: resolve('src/types'),
    }
  }
})
