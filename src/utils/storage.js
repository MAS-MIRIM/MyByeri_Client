import { STORAGE_KEY, DUMMY_DATA } from "./constants";

export const saveBooks = (books) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const loadBooks = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  // 더미 데이터 초기 로드
  saveBooks(DUMMY_DATA);
  return DUMMY_DATA;
};
