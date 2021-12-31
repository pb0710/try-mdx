import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from 'vite-plugin-mdx'
import rehypePrism from '@mapbox/rehype-prism'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx({
      // See https://mdxjs.com/advanced/plugins
      remarkPlugins: [
      ],
      rehypePlugins: [
        rehypePrism
      ],
    })
  ]
})
