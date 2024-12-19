import React from 'react';

function Checkbox({ label, value, id, onChange, checked, disabled }) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        checked={checked}
        onChange={() => onChange(value)} // Trigger onChange when clicked
        disabled={disabled} // Disable checkbox if needed
      />
      <label htmlFor={`checkbox-${id}`}>{label}</label>
    </div>
  );
}

export default Checkbox;
