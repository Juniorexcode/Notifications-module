import React from "react";
import bgImage from "../assets/Gentleman.jpg";

function BrandingPanel({
  systemName = "Plataforma de Aduanas",
  screen = "Login",
  screenId = "LOGIN-001",
}) {
  return (
    <div
      className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      
      {/* Overlay con gradiente azul semitransparente */}
      <div className="absolute inset-0 bg-gradient-to-br from-aduanasBlue/20 to-aduanasLightBlue/80"></div>

      <div className="relative text-white text-center z-10">
        <h3 className="text-2xl font-bold mb-4">{systemName}</h3>
        <p className="text-lg mb-6">
          Facilitando el comercio y la seguridad con tecnología de vanguardia.
        </p>
        <p className="text-sm opacity-80">
          Su portal a una gestión aduanera eficiente y transparente.
        </p>
        <div className="mt-6 text-xs opacity-90">
          Sistema: {systemName} • Pantalla: {screen} • ID: {screenId}
        </div>
      </div>
    </div>
  );
}

export default BrandingPanel;
