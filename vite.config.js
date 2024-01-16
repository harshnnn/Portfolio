import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl'; // Assuming you have installed this plugin

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    glsl(), // Fix: Use a single array for the plugins
    react(),
  ],
});
