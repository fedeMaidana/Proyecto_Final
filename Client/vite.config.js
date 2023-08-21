import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [ /*WindiCSS(),*/react()],
})
