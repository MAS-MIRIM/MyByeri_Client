const BookCover = ({ cover, title }) => (
  <div
    style={{
      width: "6rem",
      height: "8rem",
      background: "linear-gradient(to bottom right, #BFE3FF, #9DD7FF)",
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
    ) : null}
  </div>
);

export default BookCover;
