const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

const mapKakaoBook = (book, index = 0) => ({
  isbn: book.isbn?.trim() || `temp-${Date.now()}-${index}`,
  title: book.title?.trim() || "제목 없음",
  author: book.authors?.length > 0 ? book.authors.join(", ") : "저자 미상",
  publisher: book.publisher?.trim() || "",
  cover: book.thumbnail?.trim() || "",
  description: book.contents?.trim() || "",
  detailUrl: book.url || "",
  publishedAt: book.datetime || "",
  translators: book.translators || [],
  price: Number.isFinite(book.price) ? book.price : null,
  salePrice: Number.isFinite(book.sale_price) ? book.sale_price : null,
  status: book.status || "",
});

const requestKakaoBooks = async ({
  query,
  page = 1,
  size = 10,
  target = "title",
  sort = "accuracy",
}) => {
  if (!query?.trim()) return [];
  if (!KAKAO_REST_API_KEY) {
    console.error("VITE_KAKAO_REST_API_KEY가 설정되지 않았습니다.");
    return [];
  }

  try {
    const params = new URLSearchParams({
      query: query.trim(),
      page: String(page),
      size: String(size),
      sort,
      target,
    });

    const response = await fetch(
      `https://dapi.kakao.com/v3/search/book?${params.toString()}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error("책 검색 실패:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data?.documents || [];
  } catch (error) {
    console.error("책 검색 실패:", error);
    return [];
  }
};

const extractIsbn = (value) => {
  if (!value) return "";
  const matches = String(value).match(/\b\d{10}\b|\b\d{13}\b/g);
  return matches?.[0] || "";
};

export const searchBooks = async (query, options = {}) => {
  const documents = await requestKakaoBooks({ query, ...options });
  if (!documents.length) return [];
  return documents.map((book, index) => mapKakaoBook(book, index));
};

export const fetchBookMatch = async ({ isbn, title }) => {
  const normalizedIsbn = extractIsbn(isbn);
  if (normalizedIsbn) {
    const documents = await requestKakaoBooks({
      query: normalizedIsbn,
      target: "isbn",
      size: 1,
    });
    if (documents.length > 0) {
      return mapKakaoBook(documents[0]);
    }
  }

  if (title?.trim()) {
    const documents = await requestKakaoBooks({
      query: title.trim(),
      target: "title",
      size: 1,
    });
    if (documents.length > 0) {
      return mapKakaoBook(documents[0]);
    }
  }

  return null;
};
