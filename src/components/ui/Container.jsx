const Container = ({ children }) => (
  <div
    style={{
      width: "100%",
      maxWidth: "48rem",
      margin: "0 auto",
      padding: "2rem 1.5rem",
    }}
  >
    {children}
  </div>
);

export default Container;
