import React, { useState, useEffect } from 'react';
import InputField from './InputField';

function AddModulo({ isOpen, onClose, title = "FORMULARIO AGREGAR MÓDULO", initialData = null, onSave = null }) {
  const [sistema, setSistema] = useState('');
  const [nombre, setNombre] = useState('');
  const [habilitado, setHabilitado] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [closeType, setCloseType] = useState('');
  const [errors, setErrors] = useState({});
  const [hasValidated, setHasValidated] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setSistema(initialData.sistema || '');
        setNombre(initialData.nombre || '');
        setHabilitado(initialData.estatus === 'Habilitado');
      } else {
        setSistema('');
        setNombre('');
        setHabilitado(true);
      }
      setErrors({});
      setHasValidated(false);
    }
  }, [isOpen, initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!sistema.trim()) newErrors.sistema = 'El sistema es obligatorio';
    if (!nombre.trim()) newErrors.nombre = 'El nombre del módulo es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasValidated(true);
    if (validateForm()) {
      // Handle form submission logic here
      const formData = { sistema, nombre, estatus: habilitado ? 'Habilitado' : 'Deshabilitado' };
      console.log(formData);

      if (onSave) {
        onSave(formData);
      }

      setCloseType('save'); // Changed to 'cancel' for shrink-center animation
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setCloseType('');
        onClose();
      }, 200); // Changed to 200ms for shrink-center
    }
  };

  const handleCancel = () => {
    setCloseType('cancel'); // Changed to 'save' for slide-up animation
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setCloseType('');
      onClose();
    }, 300); // Changed to 300ms for slide-up
  };

  if (!isOpen && !isClosing) return null;

  const getAnimationClass = () => {
    if (isClosing) {
      if (closeType === 'save') return 'animate-shrink-center';
      if (closeType === 'cancel') return 'animate-slide-up';
    }
    return 'animate-slide-down';
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className={`w-full max-w-sm sm:max-w-md lg:max-w-2xl bg-surface-light rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out ${getAnimationClass()}`}>
          <div className="bg-primary text-white p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl font-bold text-center">{title}</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-3 sm:p-4 lg:p-6 xl:p-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4 sm:space-y-6">
              <InputField
                id="sistema"
                label={
                  <span className="flex items-center">
                    <span className="material-icons mr-2 text-primary">dns</span>
                    Sistema
                  </span>
                }
                placeholder="Ingrese el sistema"
                value={sistema}
                onChange={(e) => {
                  setSistema(e.target.value);
                  if (hasValidated && !e.target.value.trim()) {
                    setErrors(prev => ({ ...prev, sistema: 'El sistema es obligatorio' }));
                  } else if (hasValidated && e.target.value.trim()) {
                    setErrors(prev => ({ ...prev, sistema: '' }));
                  }
                }}
                error={errors.sistema}
                help="Ingrese el nombre del sistema al que pertenece el módulo"
              />
              <InputField
                id="nombre-modulo"
                label={
                  <span className="flex items-center">
                    <span className="material-icons mr-2 text-primary">view_module</span>
                    Nombre del módulo
                  </span>
                }
                placeholder="Ingrese el nombre del módulo"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  if (hasValidated && !e.target.value.trim()) {
                    setErrors(prev => ({ ...prev, nombre: 'El nombre del módulo es obligatorio' }));
                  } else if (hasValidated && e.target.value.trim()) {
                    setErrors(prev => ({ ...prev, nombre: '' }));
                  }
                }}
                error={errors.nombre}
                help="Ingrese el nombre completo del nuevo módulo"
              />
              <div className="py-2">
                <label className="flex items-center text-base font-medium text-text-light mb-2">
                  <span className="material-icons mr-2 text-primary">toggle_on</span>
                  Disponibilidad
                </label>
                <button
                  type="button"
                  className={`toggle-button relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
                     ${
                    habilitado ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  onClick={() => setHabilitado(!habilitado)}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className={`pointer-events-none absolute top-0 left-0 inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      habilitado ? 'translate-x-5' : 'translate-x-0'
                    }`}
                    aria-hidden="true"
                  ></span>
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 pt-4 sm:pt-6 lg:pt-8">
              <button
                type="button"
                className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-all duration-300 shadow-md text-sm sm:text-base"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-blue-800 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-all duration-300 shadow-md text-sm sm:text-base"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddModulo;
