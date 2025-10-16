// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import BrandingPanel from "../components/BrandingPanel";
import logoAduanas from "../assets/logoAduanas.png";
import bgImage from "../assets/bgImage.png";

// Generamos el componente Login
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

    // Validación simple par verificar campos
  const validate = () => {
    const e = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!username.trim()) {
        e.username = "El Email es obligatorio.";
      } else if (!emailRegex.test(username)) {
        e.username = "Debe ingresar un correo electrónico válido.";
      }
    if (!password) e.password = "La contraseña es obligatoria.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setProcessing(true);
    setErrors({});
    try {
      // reemplaza con authService.login cuando lo implementes
      await new Promise((r) => setTimeout(r, 1000));
      navigate("/departamentos");
    } catch (error) {
      console.error(error);
      setErrors({ form: "Error de autenticación. Intente de nuevo." });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-black/50 bg-blend-multiply p-4 from-aduanasBlue to-aduanasLightBlue p-4"style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: "top" }}>
      <div className="bg-white rounded-2xl shadow-3xl flex flex-col md:flex-row max-w-5xl xl:max-w-6xl w-full overflow-hidden">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center">
          <img
            alt="Logo Aduanas"
            className="h-20 mb-8"
            src={logoAduanas}
          />
          <h2 className="text-3xl font-caviar font-bold text-center text-gray-900 mb-6">
              Acceso Ejecutivo
          </h2>



          <form
            className="w-full max-w-sm space-y-6"
            onSubmit={handleSubmit}
            noValidate
          >
            <InputField
              id="username"
              label="Correo Corporativo"
              type="email"
              placeholder="example@aduanas.gob.do"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              help="Usa tu correo corporativo."
              error={errors.username}
              required
            />

            <InputField
              id="password"
              label="Contraseña Segura"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              help="Tu contraseña corporativa."
              error={errors.password}
              required
            />

            <PrimaryButton type="submit" loading={processing}>
              Iniciar Sesión
            </PrimaryButton>

            {errors.form && (
              <p className="text-sm text-red-600 mt-1 text-center">
                {errors.form}
              </p>
            )}
          </form>

          <div className="mt-8 text-center w-full max-w-sm">
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500">O</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <p className="text-gray-600 mb-4">Acceso Rápido y Seguro</p>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              type="button"
              onClick={() => alert("SSO - integrar proveedor")}
            >
              <span className="material-icons mr-2">login</span>
              Single Sign-On (SSO)
            </button>
          </div>
        </div>

        <BrandingPanel
          systemName="Plataforma de Aduanas"
          screen="Login"
          screenId="LOGIN-001"
        />
      </div>
    </div>
  );
}

export default Login;
