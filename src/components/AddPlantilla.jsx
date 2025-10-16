import React, { useState, useEffect } from 'react';

function AddPlantilla({ isOpen, onClose, title, initialData = null, onSave = null }) {
  const [departamento, setDepartamento] = useState('');
  const [modulo, setModulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [habilitado, setHabilitado] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [closeType, setCloseType] = useState('');
  const [errors, setErrors] = useState({});
  const [hasValidated, setHasValidated] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setDepartamento(initialData.departamento || '');
        setModulo(initialData.modulo || '');
        setMensaje(initialData.plantillaMensaje || '');
        setHabilitado(initialData.estatus === 'Habilitado');
      } else {
        setDepartamento('');
        setModulo('');
        setMensaje('');
        setHabilitado(true);
      }
      setErrors({});
      setHasValidated(false);
    }
  }, [isOpen, initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!departamento.trim()) newErrors.departamento = 'El departamento es obligatorio';
    if (!modulo.trim()) newErrors.modulo = 'El módulo es obligatorio';
    if (!mensaje.trim()) newErrors.mensaje = 'El mensaje es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasValidated(true);
    if (validateForm()) {
      const formData = { departamento, modulo, plantillaMensaje: mensaje, estatus: habilitado ? 'Habilitado' : 'Deshabilitado' };
      console.log(formData);

      if (onSave) {
        onSave(formData);
      }

      setCloseType('save');
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setCloseType('');
        onClose();
      }, 200);
    }
  };

  const handleCancel = () => {
    setCloseType('cancel');
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setCloseType('');
      onClose();
    }, 300);
  };

  const insertVariable = (variable) => {
    const textarea = document.getElementById('mensaje');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = mensaje;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    const newText = before + `{${variable}}` + after;
    setMensaje(newText);
    // Set cursor position after the inserted variable
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + variable.length + 2;
      textarea.focus();
    }, 0);
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
        <div className={`w-full max-w-2xl bg-surface-light rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out ${getAnimationClass()}`}>
          <div className="bg-primary text-white p-4">
            <h2 className="text-xl font-bold text-center">{title}</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-8">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <div>
                <label className="flex items-center text-base font-medium text-text-light mb-2" htmlFor="departamento">
                  <span className="material-icons mr-2 text-primary">corporate_fare</span>
                  Departamento
                </label>
                <input
                  className={`w-full bg-background-light border rounded-lg px-4 py-3 focus:ring-primary focus:border-primary transition ${
                    errors.departamento ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="departamento"
                  placeholder="Ingrese el departamento"
                  type="text"
                  value={departamento}
                  onChange={(e) => {
                    setDepartamento(e.target.value);
                    if (hasValidated && !e.target.value.trim()) {
                      setErrors(prev => ({ ...prev, departamento: 'El departamento es obligatorio' }));
                    } else if (hasValidated && e.target.value.trim()) {
                      setErrors(prev => ({ ...prev, departamento: '' }));
                    }
                  }}
                />
                {errors.departamento && (
                  <p className="text-red-500 text-sm mt-1">{errors.departamento}</p>
                )}
              </div>
              <div>
                <label className="flex items-center text-base font-medium text-text-light mb-2" htmlFor="modulo">
                  <span className="material-icons mr-2 text-primary">view_module</span>
                  Módulo
                </label>
                <input
                  className={`w-full bg-background-light border rounded-lg px-4 py-3 focus:ring-primary focus:border-primary transition ${
                    errors.modulo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="modulo"
                  placeholder="Ingrese el módulo"
                  type="text"
                  value={modulo}
                  onChange={(e) => {
                    setModulo(e.target.value);
                    if (hasValidated && !e.target.value.trim()) {
                      setErrors(prev => ({ ...prev, modulo: 'El módulo es obligatorio' }));
                    } else if (hasValidated && e.target.value.trim()) {
                      setErrors(prev => ({ ...prev, modulo: '' }));
                    }
                  }}
                />
                {errors.modulo && (
                  <p className="text-red-500 text-sm mt-1">{errors.modulo}</p>
                )}
              </div>
              <div>
                <label className="flex items-center text-base font-medium text-text-light mb-2" htmlFor="mensaje">
                  <span className="material-icons mr-2 text-primary">message</span>
                  Mensaje
                </label>
                <div className="mb-2 flex flex-wrap gap-2">
                  {['VAR1', 'VAR2', 'VAR3', 'VAR4'].map((variable) => (
                    <div
                      key={variable}
                      className="bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300 transition"
                      onClick={() => insertVariable(variable)}
                    >
                      {variable}
                    </div>
                  ))}
                </div>
                <textarea
                  className={`w-full bg-background-light border rounded-lg px-4 py-3 focus:ring-primary focus:border-primary transition resize-none ${
                    errors.mensaje ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="mensaje"
                  placeholder="Escriba su mensaje aquí..."
                  rows="6"
                  value={mensaje}
                  onChange={(e) => {
                    setMensaje(e.target.value);
                    if (hasValidated && !e.target.value.trim()) {
                      setErrors(prev => ({ ...prev, mensaje: 'El mensaje es obligatorio' }));
                    } else if (hasValidated && e.target.value.trim()) {
                      setErrors(prev => ({ ...prev, mensaje: '' }));
                    }
                  }}
                />
                {errors.mensaje && (
                  <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
                )}
              </div>
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
            <div className="flex justify-end gap-4 pt-8">
              <button
                type="button"
                className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-all duration-300 shadow-md text-sm sm:text-base"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md"
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

export default AddPlantilla;
