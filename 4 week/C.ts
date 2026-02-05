
interface Book {
  isbn: string;
  title: string;
  author: string;
  pages: number;
  inStockCount: number;
}

type BookCatalogItem = Omit<Book, 'inStockCount'>;

type LibraryCatalog = Record<string, BookCatalogItem>; 

const myBook: Book = {
  isbn: "123",
  title: "Hello",
  author: "Artyom Cheremnykh",
  pages: 350,
  inStockCount: 42
};

const catalogItem: BookCatalogItem = {
  isbn: "123",
  title: "Hello",
 author: "Artyom Cheremnykh",
  pages: 350
};


const library: LibraryCatalog = {
  "123": {
    isbn: "123",
    title: "Hello",
    author: "Artyom Cheremnykh",
    pages: 350
  },
  "321": {
    isbn: "312",
    title: "Bye",
    author: "Artyom Cheremnykh",
    pages: 464
  }
};

function addToCatalog(
  catalog: LibraryCatalog, 
  book: Book
): void {
  const { inStockCount, ...bookWithoutStock } = book;
  catalog[book.isbn] = bookWithoutStock;
}

addToCatalog(library, {
  isbn: "111",
  title: "Goodbay",
  author: "Artyom Cheremnykh,Cheremnykh Artyom",
  pages: 352,
  inStockCount: 15
});

console.log(library["123"], library["321"], library["111"]);