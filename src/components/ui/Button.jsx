const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  type = "button",
  style: customStyle = {},
}) => {
  const baseStyle = {
    width: "100%",
    padding: "0.875rem 1.75rem",
    borderRadius: "0.75rem",
    border: "none",
    fontWeight: "600",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    fontSize: "1rem",
    fontFamily: "Pretendard",
    boxShadow: disabled 
      ? "none" 
      : "0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  };

  const variants = {
    primary: {
      backgroundColor: disabled ? "#d1d5db" : "#7BC3FF",
      color: "white",
      hoverColor: "#6FB9F2",
      hoverShadow: "0 2px 6px rgba(123, 195, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.06)",
    },
    secondary: {
      backgroundColor: "white",
      color: "#374151",
      border: "1px solid #E5E7EB",
      hoverColor: "#FAFAFA",
      hoverShadow: "0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
    },
  };

  const style = { ...baseStyle, ...variants[variant], ...customStyle };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = variants[variant].hoverColor;
          if (variants[variant].hoverShadow) {
            e.target.style.boxShadow = variants[variant].hoverShadow;
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = variants[variant].backgroundColor;
          e.target.style.boxShadow = baseStyle.boxShadow;
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;
