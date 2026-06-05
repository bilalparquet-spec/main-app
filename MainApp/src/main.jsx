import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from './lib/router.jsx'
import RouterShell from './router.jsx'
import CSS from './styles/globalCSS.js'
import { SplashScreen } from './components/SplashScreen.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'

const globalStyle = document.createElement('style')
globalStyle.setAttribute('data-driverent-global', 'true')
globalStyle.textContent = CSS
document.head.appendChild(globalStyle)

function Root() {
  // ── أظهر SplashScreen مرة واحدة لكل فتح للتطبيق ──────────────────────────
  // sessionStorage يضمن ظهوره كل مرة يُفتح التطبيق (وليس بين الصفحات)
  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem('driverent_splash_done') === '1'
  );

  const handleSplashDone = () => {
    sessionStorage.setItem('driverent_splash_done', '1');
    setSplashDone(true);
  };

  return (
    <ErrorBoundary>
      {!splashDone && <SplashScreen onDone={handleSplashDone} />}
      <RouterProvider>
        <RouterShell />
      </RouterProvider>
    </ErrorBoundary>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
