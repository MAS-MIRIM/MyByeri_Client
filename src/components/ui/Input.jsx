const Input = ({ value, onChange, placeholder, type = "text", ...props }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: "100%",
      padding: "0.875rem 1.125rem",
      border: "1px solid #E5E7EB",
      borderRadius: "0.75rem",
      fontSize: "1rem",
      outline: "none",
      fontFamily: "Pretendard",
      backgroundColor: "#FAFAFA",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      color: "#111827",
    }}
    onFocus={(e) => {
      e.target.style.boxShadow = "0 0 0 3px rgba(123, 195, 255, 0.15)";
      e.target.style.borderColor = "#7BC3FF";
      e.target.style.backgroundColor = "white";
    }}
    onBlur={(e) => {
      e.target.style.boxShadow = "none";
      e.target.style.borderColor = "#E5E7EB";
      e.target.style.backgroundColor = "#FAFAFA";
    }}
    {...props}
  />
);

export default Input;
