export interface Book {
  title: string;
  image: string;
  description: string;
  author: string;
  price: string;
  discount: string;
  link: string;
  pubdate: string;
  publisher: string;
}

export interface MainBooks {
  title: string;
  image: string;
  description: string;
  author: string;
  price: string;
  discount: string;
  link: string;
  pubdate: string;
  publisher: string;
}

export interface PickBooks {
  title: string;
  image: string;
  description: string;
  author: string;
  price: string;
  discount: string;
  link: string;
  pubdate: string;
  publisher: string;
}

export interface BookData {
  book:Book;
}