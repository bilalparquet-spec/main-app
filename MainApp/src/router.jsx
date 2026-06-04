import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "./lib/router.jsx";
import App from "./App.jsx";
import { LoginPage } from "./components/pages/LoginPage.jsx";
import { RegisterPage } from "./components/pages/RegisterPage.jsx";
import { GoogleAuthPage } from "./components/pages/GoogleAuthPage.jsx";
import { AppleAuthPage } from "./components/pages/AppleAuthPage.jsx";
import { AgencyRegisterPage } from "./components/pages/AgencyRegisterPage.jsx";
import { getAppLanguage, handleOAuthCallback } from "./lib/supabase.js";
import { useI18nDom } from "./lib/i18nDom.js";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";

export default function RouterShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [lang, setLang] = useState(getAppLanguage());
  useEffect(() => {
    handleOAuthCallback().catch(() => null);
    const sync = () => setLang(getAppLanguage());
    window.addEventListener("driverent-language-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("driverent-language-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  useI18nDom(lang, [pathname]);

  const back = () => navigate(-1);

  if (pathname === "/login")           return <ErrorBoundary page="تسجيل الدخول"    onBack={back}><LoginPage /></ErrorBoundary>;
  if (pathname === "/register")        return <ErrorBoundary page="إنشاء حساب"      onBack={back}><RegisterPage /></ErrorBoundary>;
  if (pathname === "/auth/google")     return <ErrorBoundary page="تسجيل Google"    onBack={back}><GoogleAuthPage /></ErrorBoundary>;
  if (pathname === "/auth/apple")      return <ErrorBoundary page="تسجيل Apple"     onBack={back}><AppleAuthPage /></ErrorBoundary>;
  if (pathname === "/agency-register") return <ErrorBoundary page="تسجيل الوكالة"   onBack={back}><AgencyRegisterPage /></ErrorBoundary>;
  return <ErrorBoundary><App /></ErrorBoundary>;
}
