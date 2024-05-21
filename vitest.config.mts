import react from '@vitejs/plugin-react-swc'

// eslint-disable-next-line import/named
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    watch: false,
    coverage: {
      provider: 'v8',
    },
  },
})
