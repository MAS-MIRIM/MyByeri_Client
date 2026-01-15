const Header = ({ title, subtitle }) => (
  <div style={{ marginBottom: "2.5rem" }}>
    <h1
      style={{
        fontSize: "2.5rem",
        fontWeight: "800",
        color: "#111827",
        marginBottom: "0.75rem",
        fontFamily: "Paperlogy",
        textAlign: "center",
        letterSpacing: "-0.02em",
        lineHeight: "1.2",
      }}
    >
      {title}
    </h1>
    {subtitle && (
      <p
        style={{
          color: "#6B7280",
          textAlign: "center",
          fontFamily: "Pretendard",
          fontSize: "1rem",
          lineHeight: "1.6",
          maxWidth: "32rem",
          margin: "0 auto",
        }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default Header;
