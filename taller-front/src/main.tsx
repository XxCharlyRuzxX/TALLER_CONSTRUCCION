import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from './components/ui/sonner';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <App />
      <Toaster richColors />
    </NextUIProvider>
  </StrictMode>,
)
