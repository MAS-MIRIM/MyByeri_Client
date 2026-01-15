const TextArea = ({ value, onChange, placeholder, disabled, rows = 6 }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    rows={rows}
    style={{
      width: "100%",
      padding: "0.875rem 1.125rem",
      border: "1px solid #E5E7EB",
      borderRadius: "0.75rem",
      fontSize: "1rem",
      outline: "none",
      resize: "none",
      fontFamily: "Pretendard",
      backgroundColor: disabled ? "#F3F4F6" : "#FAFAFA",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      color: "#111827",
      lineHeight: "1.6",
    }}
    onFocus={(e) => {
      if (!disabled) {
        e.target.style.boxShadow = "0 0 0 3px rgba(123, 195, 255, 0.15)";
        e.target.style.borderColor = "#7BC3FF";
        e.target.style.backgroundColor = "white";
      }
    }}
    onBlur={(e) => {
      e.target.style.boxShadow = "none";
      e.target.style.borderColor = "#E5E7EB";
      e.target.style.backgroundColor = disabled ? "#F3F4F6" : "#FAFAFA";
    }}
  />
);

export default TextArea;
