import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginPage from './login.tsx'
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HelmetProvider>
			<LoginPage />
		</HelmetProvider>
	</StrictMode>,
)
