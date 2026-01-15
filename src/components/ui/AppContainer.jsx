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
      background: "linear-gradient(to bottom right, #F0F9F4, #E8F5E9)",
      fontFamily: "Pretendard",
    }}
  >
    {children}
  </div>
);

export default AppContainer;
