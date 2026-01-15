const AppContainer = ({ children }) => (
  <div
    style={{
      width: "100%",
      minHeight: "100vh",
      margin: 0,
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
