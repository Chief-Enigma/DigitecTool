import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const certificateName = "digitectoolweb.client"; // Replace with your actual certificate name

const certFilePath = path.join(process.env.APPDATA, 'ASP.NET/https', `${certificateName}.pem`);
const keyFilePath = path.join(process.env.APPDATA, 'ASP.NET/https', `${certificateName}.key`);

// Check if the certificate files exist
const useHttps = fs.existsSync(certFilePath) && fs.existsSync(keyFilePath);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/weatherforecast': {
                target: 'https://localhost:7012/',
                secure: false
            }
        },
        port: 5173,
        https: useHttps
            ? {
                key: fs.readFileSync(keyFilePath),
                cert: fs.readFileSync(certFilePath),
            }
            : undefined,
    }
});
