import ReactGA from "react-ga4";

export const initAnalytics = () => {
  const GA_ID = (window as any).APP_CONFIG?.GA_MEASUREMENT_ID;

  if (!GA_ID) {
    console.warn("GA Measurement ID no configurado");
    return;
  }

  // Inject GA script dynamically
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID);

  ReactGA.initialize(GA_ID);
  ReactGA.send("pageview");

  console.log("Google Analytics inicializado");
};