import React, { useState, useRef } from "react";

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  help,
  error,
  required = true,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => setShowTooltip(true), 1000); // 1 segundo
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setShowTooltip(false);
  };

  return (
    <div className="relative">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-describedby={help ? `${id}Help` : undefined}
          className={`input-field flex-1 ${error ? "border-red-500 ring-2 ring-red-200" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {required && <span className="text-red-500 ml-2">*</span>}

        {/* Tooltip flotante */}
        {showTooltip && help && (
          <div
            id={`${id}Help`}
            className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg z-10"
          >
            {help}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

export default InputField;
