const Container = ({ children, padding }) => (
  <div
    style={{
      width: "100%",
      maxWidth: "32rem",
      margin: "0 auto",
      padding: padding || "1.5rem 1.5rem 5rem 1.5rem",
    }}
  >
    {children}
  </div>
);

export default Container;
