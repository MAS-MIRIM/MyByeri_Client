const AppContainer = ({ children }) => (
  <div
    style={{
      width: "100%",
      maxWidth: "32rem",
      minHeight: "100vh",
      margin: "0 auto",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      background: "#EEF7FF",
      fontFamily: "Pretendard",
    }}
  >
    {children}
  </div>
);

export default AppContainer;
