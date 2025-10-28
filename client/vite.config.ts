import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // Mantenemos solo el plugin esencial de React.
  // Los plugins de Replit no son necesarios y pueden causar problemas en Netlify.
  plugins: [react()],
  
  // Corregimos los alias para que funcionen desde DENTRO de la carpeta 'client'.
  resolve: {
    alias: {
      // '@' ahora apunta a la carpeta 'src' que está aquí mismo.
      "@": path.resolve(__dirname, "./src"),
      
      // '@shared' ahora sube un nivel para encontrar la carpeta 'shared'.
      "@shared": path.resolve(__dirname, "../shared"),
      
      // '@assets' ahora sube un nivel para encontrar 'attached_assets'.
      "@assets": path.resolve(__dirname, "../attached_assets"),
    },
  },
  
  // Eliminamos la opción 'root' y 'build.outDir' con rutas complejas.
  // Vite, por defecto, usará 'index.html' en esta misma carpeta (client/)
  // y creará la carpeta 'dist' aquí mismo, que es lo que Netlify espera.
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});