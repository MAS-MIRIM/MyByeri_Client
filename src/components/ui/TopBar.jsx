import Logo from "../../assets/Logo.svg";
import { Search } from "lucide-react";

const TopBar = ({ onSearch }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "36rem",
        margin: "0 auto",
        padding: "1rem 1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <img
        src={Logo}
        alt="MYBYERI"
        style={{
          height: "28px",
        }}
      />
      <button
        onClick={onSearch}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
          borderRadius: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#F3F4F6";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <Search size={24} color="#374151" />
      </button>
    </div>
  );
};

export default TopBar;
