import React from 'react';

const Button = ({
  children,
  onClick,
  className = '',
  style = {},
  type = 'button',
  disabled = false,
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`common-button ${className} ${disabled ? 'disabled' : ''}`}
      style={{
        padding: '10px 20px',
        opacity: disabled || isLoading ? 0.6 : 1,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        ...style,
      }}
      disabled={disabled || isLoading}
    >
      {isLoading ? '로딩 중...' : children}
    </button>
  );
};

export default Button;
