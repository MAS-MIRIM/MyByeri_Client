export const searchBooks = async (query) => {
  try {
    const response = await fetch(
      `https://www.nl.go.kr/seoji/SearchApi.do?cert_key=&result_style=json&page_no=1&page_size=10&title=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();

    if (!data.docs || data.docs.length === 0) return [];

    return data.docs.map((book, index) => ({
      isbn: book.ISBN || `temp-${Date.now()}-${index}`,
      title: book.TITLE || "제목 없음",
      author: book.AUTHOR || "저자 미상",
      publisher: book.PUBLISHER || "",
      cover: book.TITLE_URL || "",
    }));
  } catch (error) {
    console.error("책 검색 실패:", error);
    return [];
  }
};
