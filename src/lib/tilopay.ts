type TilopaySdk = {
  Init: (params: Record<string, unknown>) => { message?: string } | undefined;
  startPayment: () => unknown;
};

declare global {
  interface Window {
    Tilopay?: TilopaySdk;
  }
}

type TilopayInitParams = {
  token: string;
  currency: string;
  language: string;
  amount: number;
  billToEmail: string;
  orderNumber: string;
  billToFirstName?: string;
  billToLastName?: string;
  billToAddress?: string;
  billToCity?: string;
  billToCountry?: string;
  capture?: 0 | 1;
  redirect?: string;
  subscription?: 0 | 1;
};

const SDK_URL = "https://app.tilopay.com/sdk/v1/sdk.min.js";
const JQUERY_URL = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";

export async function loadTilopaySdk() {
  const loadScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src=\"${src}\"]`)) return resolve();
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
      document.body.appendChild(script);
    });

  await loadScript(JQUERY_URL);
  await loadScript(SDK_URL);
}

export async function startTilopayPayment(params: TilopayInitParams) {
  if (typeof window === "undefined") return { error: "window unavailable" };
  if (!window.Tilopay) {
    await loadTilopaySdk();
  }
  if (!window.Tilopay) {
    return { message: "Tilopay SDK no disponible" };
  }

  const sdk = window.Tilopay;

  const initResult = sdk.Init({
    ...params,
    capture: params.capture ?? 1,
    language: params.language ?? "es",
    subscription: params.subscription ?? 0,
  });

  if (initResult?.message === "Success") {
    const res = sdk.startPayment();
    return res;
  }
  return initResult;
}
