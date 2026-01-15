import Logo from "../../assets/Logo.svg";
import { Search } from "lucide-react";

const TopBar = ({ onSearch, onLogoClick, showSearch = true }) => {
  return (
    <div
      style={{
        width: "100%",
        margin: "0",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <button
        onClick={onLogoClick}
        type="button"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={Logo}
          alt="MYBYERI"
          style={{
            height: "28px",
          }}
        />
      </button>
      {showSearch ? (
        <button
          onClick={onSearch}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
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
      ) : (
        <div style={{ width: "24px", height: "24px" }} />
      )}
    </div>
  );
};

export default TopBar;
