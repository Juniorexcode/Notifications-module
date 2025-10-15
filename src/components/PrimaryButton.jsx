import React from "react";

function PrimaryButton({ children, type = "button", loading = false, disabled = false, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full bg-aduanasBlue text-white py-3 rounded-lg font-semibold hover:bg-aduanasLightBlue transition-colors duration-300 transform hover:scale-105 shadow-lg disabled:opacity-60"
    >
      {loading ? "Procesando..." : children}
    </button>
  );
}

export default PrimaryButton;