const ProgressBar = ({ progress, isComplete }) => (
  <div
    style={{
      width: "100%",
      backgroundColor: "#E5E7EB",
      borderRadius: "9999px",
      height: "0.5rem",
      overflow: "hidden",
      boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
    }}
  >
    <div
      style={{
        height: "100%",
        background: isComplete 
          ? "linear-gradient(90deg, #5AA4E6 0%, #7BC3FF 100%)"
          : "linear-gradient(90deg, #7BC3FF 0%, #9DD7FF 100%)",
        width: `${progress}%`,
        transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: "9999px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
      }}
    />
  </div>
);

export default ProgressBar;
