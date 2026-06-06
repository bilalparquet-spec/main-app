import { Component } from "react";
import APP_ICON_IMG from "../assets/appIcon.js";

/**
 * ErrorBoundary — حماية شاملة لـ DriveRENT
 *
 * معايير ui-ux-pro-max المُطبّقة:
 * - escape-routes: زر رجوع + زر إعادة المحاولة + زر الرئيسية
 * - error-recovery: رسالة واضحة + مسار استرداد
 * - primary-action: زر رئيسي واحد واضح في كل حالة
 * - loading-states: fallback UI بدل الشاشة البيضاء
 *
 * يلتقط أخطاء:
 * - أي صفحة (CarDetail, ProfilePage, MessagesPage...)
 * - أي component (sections, cards, modals...)
 * - أخطاء JavaScript غير متوقعة
 *
 * الاستخدام:
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 *
 *   أو حول صفحة معينة:
 *   <ErrorBoundary page="تفاصيل السيارة" onBack={() => navigate(-1)}>
 *     <CarDetail />
 *   </ErrorBoundary>
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // يمكن إضافة Sentry أو أي خدمة تتبع هنا
    console.error("[DriveRENT Error]", error, errorInfo);
  }

  handleRetry = () => {
    this.setState(prev => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prev.retryCount + 1,
    }));
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // إعادة التوجيه للرئيسية
    window.location.hash = "";
    window.location.pathname = "/";
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const { onBack, page } = this.props;

    return (
      <ErrorScreen
        error={this.state.error}
        page={page}
        retryCount={this.state.retryCount}
        onRetry={this.handleRetry}
        onBack={onBack}
        onGoHome={this.handleGoHome}
      />
    );
  }
}

// ── شاشة الخطأ ──────────────────────────────────────────────────────────────
function ErrorScreen({ error, page, retryCount, onRetry, onBack, onGoHome }) {
  const isDev = import.meta.env?.DEV;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#07080F",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 20px",
      zIndex: 9990,
      fontFamily: "'Cairo', system-ui, sans-serif",
    }}>

      {/* ── خلفية ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 50% 40%, rgba(239,68,68,.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }}/>

      {/* ── أيقونة التطبيق مع علامة تحذير ── */}
      <div style={{ position: "relative", marginBottom: 24, animation: "fadeUp .4s ease" }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(239,68,68,.25)",
          opacity: .6,
          boxShadow: "0 12px 40px rgba(239,68,68,.12)",
        }}>
          <img src={APP_ICON_IMG} alt="DriveRENT" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>
        {/* علامة التحذير */}
        <div style={{
          position: "absolute",
          bottom: -6,
          right: -6,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#EF4444",
          border: "2px solid #07080F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 900,
          color: "#fff",
          animation: "badgePop .4s .2s ease both",
        }}>!</div>
      </div>

      {/* ── العنوان ── */}
      <h2 style={{
        fontSize: 20,
        fontWeight: 800,
        color: "#F1F5F9",
        marginBottom: 8,
        textAlign: "center",
        animation: "fadeUp .4s .08s ease both",
      }}>
        حدث خطأ غير متوقع
      </h2>

      {/* ── الوصف ── */}
      <p style={{
        fontSize: 14,
        color: "rgba(255,255,255,.45)",
        textAlign: "center",
        lineHeight: 1.7,
        marginBottom: 32,
        maxWidth: 280,
        animation: "fadeUp .4s .14s ease both",
      }}>
        {page
          ? `تعذّر تحميل صفحة "${page}".`
          : "تعذّر تحميل هذا الجزء من التطبيق."
        }
        {retryCount < 2
          ? " جرّب مرة أخرى."
          : " إذا استمرت المشكلة، أعد تشغيل التطبيق."
        }
      </p>

      {/* ── الأزرار ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
        maxWidth: 280,
        animation: "fadeUp .4s .2s ease both",
      }}>

        {/* زر إعادة المحاولة — الرئيسي */}
        <button
          onClick={onRetry}
          style={{
            background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
            border: "none",
            borderRadius: 14,
            padding: "14px 24px",
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 8px 24px rgba(124,58,237,.3)",
            transition: "transform .15s, filter .15s",
          }}
          onMouseDown={e => { e.currentTarget.style.transform = "scale(.97)"; }}
          onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
          onTouchStart={e => { e.currentTarget.style.transform = "scale(.97)"; }}
          onTouchEnd={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {/* أيقونة تحديث */}
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M14 8.5A5.5 5.5 0 1 1 8.5 3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M8.5 3L11 5.5L8.5 8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          إعادة المحاولة
        </button>

        {/* زر رجوع (إذا توفّر) */}
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 14,
              padding: "13px 24px",
              color: "rgba(255,255,255,.7)",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "background .15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; }}
          >
            رجوع
          </button>
        )}

        {/* زر الرئيسية */}
        <button
          onClick={onGoHome}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,.35)",
            fontSize: 13,
            fontFamily: "inherit",
            cursor: "pointer",
            padding: "8px",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          العودة للصفحة الرئيسية
        </button>
      </div>

      {/* ── تفاصيل الخطأ (للمطورين فقط) ── */}
      {isDev && error && (
        <details style={{
          marginTop: 24,
          width: "100%",
          maxWidth: 340,
          background: "rgba(239,68,68,.06)",
          border: "1px solid rgba(239,68,68,.15)",
          borderRadius: 10,
          padding: "10px 14px",
          animation: "fadeUp .4s .3s ease both",
        }}>
          <summary style={{
            fontSize: 12,
            color: "rgba(239,68,68,.7)",
            cursor: "pointer",
            fontWeight: 600,
            marginBottom: 6,
          }}>
            تفاصيل الخطأ (dev mode)
          </summary>
          <pre style={{
            fontSize: 11,
            color: "rgba(239,68,68,.6)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            lineHeight: 1.5,
            margin: 0,
            fontFamily: "monospace",
          }}>
            {error?.message || String(error)}
          </pre>
        </details>
      )}
    </div>
  );
}

/**
 * withErrorBoundary — HOC لتسهيل الاستخدام
 *
 * الاستخدام:
 *   export default withErrorBoundary(CarDetail, "تفاصيل السيارة");
 */
export function withErrorBoundary(Component, pageName) {
  return function WrappedWithBoundary(props) {
    return (
      <ErrorBoundary page={pageName} onBack={props.onBack}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
