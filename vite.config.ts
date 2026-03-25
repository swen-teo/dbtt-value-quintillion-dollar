import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    {
      name: 'resolve-figma-assets',
      resolveId(source) {
        if (!source.startsWith('figma:asset/')) return null

        const assetName = source.replace('figma:asset/', '')
        const assetPath = path.resolve(__dirname, 'src/assets', assetName)

        if (fs.existsSync(assetPath)) {
          return assetPath
        }

        return null
      },
    },
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
