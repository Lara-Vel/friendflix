import { Head, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function NotFound() {
  return (
    <div className="ffx-404">
      <Head title="404 — Friendflix" />
      {/* CIELO + NUBES */}
      <div className="ffx-404-sky" aria-hidden="true">
        <span className="cloud sway c1" />
        <span className="cloud sway c2" />
        <span className="cloud sway c3" />
        <span className="cloud sway c4" />
        <span className="cloud sway c5" />
      </div>

      {/* CONTENIDO */}
      <main className="ffx-404-content">
        <img
          className="ffx-404-hero"
          src="/images/V1-404-desktop.png"
          alt="404 palomitas tristes"
          width="600"
          height="350"
        />

        <p className="ffx-404-text">
          Esta peli no está en tu lista (aún)... Vuelve al inicio para seguir explorando o mira las listas de tus amigos.
        </p>

        <PrimaryButton
          type="button"
          className="button button-404"
          onClick={() => router.visit("/")}
        >
          <span>Volver al inicio</span>
        </PrimaryButton>
      </main>
    </div>
  );
}
