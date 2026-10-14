import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./',import.meta.url));
export default defineConfig({root:root+'frontend',plugins:[{name:'shared-hosting-status',enforce:'pre',transform(code,id){if(id.endsWith('/components/dashboard.tsx'))return code.replace('Automatic live refresh is not connected.','Timestamped snapshot; today may be partial.');}},react()],resolve:{alias:{'@':fileURLToPath(new URL('../',import.meta.url))}},build:{outDir:root+'public_html',emptyOutDir:false}});
