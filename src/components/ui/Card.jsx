const Card = ({ children, onClick, className = "" }) => (
  <div
    onClick={onClick}
    style={{
      background: "white",
      borderRadius: "1rem",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
      padding: "1.5rem",
      cursor: onClick ? "pointer" : "default",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      fontFamily: "Pretendard",
      border: "1px solid rgba(0, 0, 0, 0.04)",
    }}
    className={className}
    onMouseEnter={(e) =>
      onClick &&
      (e.currentTarget.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.09), 0 1px 2px rgba(0, 0, 0, 0.04)")
    }
    onMouseLeave={(e) =>
      onClick &&
      (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)")
    }
  >
    {children}
  </div>
);

export default Card;
