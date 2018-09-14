import React from "react";
import classnames from "classnames";

import PropTypes from "prop-types";

const TextInputGroup = ({ name, label, type, placeholder, value, onChange, errors, salar }) => {
  return (
    <div className="form-group">
      <label htmlFor="name">{label}:</label>

      <input
        label={label}
        name={name}
        type={type}
        className={classnames("form-control form-control-bg", { "is-invalid": errors })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        errors={errors}
        salar={salar}
      />
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
};
TextInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  errors: PropTypes.string
};
TextInputGroup.defaultProps = {
  type: "text"
};
export default TextInputGroup;
