import HomeIcon from "../../assets/Home.svg";
import BookIcon from "../../assets/Book.svg";
import ProfileIcon from "../../assets/Profile.svg";
import PuzzleIcon from "../../assets/Puzzle.svg";

const NavBar = ({ currentView, onNavigate }) => {
  const menuItems = [
    { id: "home", icon: HomeIcon },
    { id: "book", icon: BookIcon },
    { id: "puzzle", icon: PuzzleIcon },
    { id: "profile", icon: ProfileIcon },
  ];

  return (
    <nav
      style={{
        width: "100%",
        maxWidth: "32rem",
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#FFFFFF",
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
