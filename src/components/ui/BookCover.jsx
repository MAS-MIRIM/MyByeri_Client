import { Book } from "lucide-react";

const BookCover = ({ cover, title }) => (
  <div
    style={{
      width: "5rem",
      height: "7rem",
      background: "linear-gradient(to bottom right, #A5D6A7, #81C784)",
      borderRadius: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {cover ? (
      <img
        src={cover}
        alt={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "0.5rem",
        }}
      />
    ) : (
      <Book size={32} color="white" />
    )}
  </div>
);

export default BookCover;
