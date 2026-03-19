# InnerMan / ElegantUnder / ManBase

E‑commerce premium de ropa interior masculina construido con Next.js 16 (App Router), TypeScript, Tailwind + shadcn/ui, y Firebase (Auth, Firestore, Storage). Integración de pagos con Tilopay (SDK v1) y POS para tienda física.

## Requisitos previos
- Node 20+ y npm.
- Proyecto de Firebase con Auth (email/Google), Firestore y Storage habilitados.
- Token SDK Tilopay (endpoint `GetTokenSdk` en su panel) y credenciales para webhooks.

## Instalación rápida
```bash
npm install
npm run dev
```

## Variables de entorno (`.env.local`)
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_TILOPAY_TOKEN=            # token del método Tilopay.Init()
TILOPAY_SDK_TOKEN=                    # opcional, mismo valor para el endpoint /api/tilopay/token
```

## Scripts
- `npm run dev` – entorno local.
- `npm run build` / `npm start` – producción.
- `npm run lint` – ESLint.

## Estructura clave
- `src/app` – rutas públicas (home, shop, product/[slug], cart, checkout) y admin (dashboard, products, inventory, orders, accounting, pos).
- `src/components` – UI shadcn (button, card, input…), layout (navbar, footer), ecommerce (ProductCard, TilopayButton, POSCart).
- `src/contexts` – Auth + roles, Cart persistente (localStorage + Firestore), Products con listeners en tiempo real.
- `src/lib/firebase.ts` – inicialización Firebase.
- `src/lib/tilopay.ts` – helper para cargar SDK (`https://app.tilopay.com/sdk/v1/sdk.min.js`) y disparar `Tilopay.Init` → `startPayment`.
- `src/app/api/tilopay/webhook` – recibe webhooks y guarda en `webhooks/{orderNumber}`.

## Flujo de pagos Tilopay
1) `TilopayButton` carga jQuery + sdk v1 y llama `Tilopay.Init({ token, amount, currency, billToEmail, orderNumber, ... })` con `capture: 1` y `subscription: 0`.  
2) Al hacer clic se ejecuta `startPayment()`; Tilopay gestiona 3DS dentro del contenedor `#result`.  
3) Configura el callback `redirect` (en el componente usa `/checkout/success`) o procesa el webhook en `/api/tilopay/webhook` para descontar stock y registrar contabilidad.  
Parámetros obligatorios: `token`, `currency` (ISO 4217), `language`, `amount`, `billToEmail`, `orderNumber` según guía SDK.

## Datos de Firestore sugeridos
- Colección `products`: `{ name, slug, price, material, type, description, sizes[], colors[], images[], variants:[{size,color,quantity}], featured }`.
- Colección `carts/{uid}`: `{ items: CartItem[] }` (sincronizado en login).
- Colección `accounting`: `{ date, type, amount, description, method, reference }`.
- Colección `webhooks`: payloads de Tilopay.

## Reglas de seguridad iniciales (ajusta según roles)
```json
// Firestore Rules (borrador)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{id} {
      allow read: if true;
      allow write: if request.auth.token.role == 'admin';
    }
    match /carts/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /accounting/{id}, /orders/{id}, /inventory/{id} {
      allow read, write: if request.auth.token.role == 'admin';
    }
    match /webhooks/{id} {
      allow write: if true; // restringe por IP / clave secreta con Functions
      allow read: if request.auth.token.role == 'admin';
    }
  }
}
```

## Deploy
- **Frontend**: Vercel → variables de entorno anteriores. Habilita dominio para imágenes de Unsplash en `next.config.ts` ya incluido.
- **Backend Firebase**: Firestore/Storage/Auth en el mismo proyecto. Webhook: usa Cloud Functions HTTPS que reenvíe a `/api/tilopay/webhook` o procesa directo en Functions.

## UX & diseño
- Paleta obligatoria: primario `#2E7618`, secundario `#042A8F`, fondo negro, textos blanco, grises `gray-800/900/100/50`. Configurada en `tailwind.config.ts` y aplicada en componentes.
- Estilo premium, minimalista, contrastes altos, acentos verdes/navy en botones y resaltados.

## Próximos pasos sugeridos
- Conectar roles reales via Custom Claims (`admin`, `cashier`).
- Añadir `orders` con pipeline: checkout → webhook → descontar stock → actualizar estado (`pendiente/pagado/enviado/entregado`).
- Sustituir imágenes de Unsplash por Storage y optimizar con `<Image />`.
- Añadir pruebas e2e (Playwright) para checkout y POS.
