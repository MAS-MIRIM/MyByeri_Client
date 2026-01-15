import HomeIcon from "../../assets/Home.svg";
import BookIcon from "../../assets/Book.svg";
import ProfileIcon from "../../assets/Profile.svg";
import PuzzleIcon from "../../assets/Puzzle.svg";

const NavBar = ({ currentView, onNavigate }) => {
  const menuItems = [
    { id: "home", icon: HomeIcon, label: "홈" },
    { id: "book", icon: BookIcon, label: "책" },
    { id: "puzzle", icon: PuzzleIcon, label: "퍼즐" },
    { id: "profile", icon: ProfileIcon, label: "프로필" },
  ];

  return (
    <nav
      style={{
        maxWidth: "36rem",
        position: "fixed",
        bottom: 0,
        left: 460,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
        padding: "0.75rem 0",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 1000,
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      {menuItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.25rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              transition: "all 0.2s",
              fontFamily: "Pretendard",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F3F4F6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <img
              src={item.icon}
              alt={item.label}
              style={{
                width: "24px",
                height: "24px",
                opacity: isActive ? 1 : 0.5,
                transition: "opacity 0.2s",
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                color: isActive ? "#111827" : "#6B7280",
                fontWeight: isActive ? "600" : "400",
                transition: "all 0.2s",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default NavBar;
