
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const genres = [
    { name: "Fiction", description: "Literary and general fiction." },
    { name: "Science Fiction", description: "Speculative and futuristic fiction." },
    { name: "Fantasy", description: "Magical and imaginary worlds." },
    { name: "Technology", description: "Computing, engineering and technology." },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });
  }

  const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", publishedYear: 1925, genre: "Fiction" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084", publishedYear: 1960, genre: "Fiction" },
    { title: "1984", author: "George Orwell", isbn: "9780451524935", publishedYear: 1949, genre: "Fiction" },
    { title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518", publishedYear: 1813, genre: "Fiction" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "9780316769488", publishedYear: 1951, genre: "Fiction" },

    { title: "Dune", author: "Frank Herbert", isbn: "9780441172719", publishedYear: 1965, genre: "Science Fiction" },
    { title: "Foundation", author: "Isaac Asimov", isbn: "9780553293357", publishedYear: 1951, genre: "Science Fiction" },
    { title: "Neuromancer", author: "William Gibson", isbn: "9780441569595", publishedYear: 1984, genre: "Science Fiction" },
    { title: "The Martian", author: "Andy Weir", isbn: "9780553418026", publishedYear: 2011, genre: "Science Fiction" },
    { title: "Fahrenheit 451", author: "Ray Bradbury", isbn: "9781451673319", publishedYear: 1953, genre: "Science Fiction" },

    { title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227", publishedYear: 1937, genre: "Fantasy" },
    { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", isbn: "9780547928210", publishedYear: 1954, genre: "Fantasy" },
    { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", isbn: "9780747532699", publishedYear: 1997, genre: "Fantasy" },
    { title: "The Name of the Wind", author: "Patrick Rothfuss", isbn: "9780756404741", publishedYear: 2007, genre: "Fantasy" },
    { title: "A Game of Thrones", author: "George R.R. Martin", isbn: "9780553593716", publishedYear: 1996, genre: "Fantasy" },

    { title: "Clean Code", author: "Robert C. Martin", isbn: "9780132350884", publishedYear: 2008, genre: "Technology" },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt", isbn: "9780135957059", publishedYear: 1999, genre: "Technology" },
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", isbn: "9781449373320", publishedYear: 2017, genre: "Technology" },
    { title: "Code", author: "Charles Petzold", isbn: "9780137909100", publishedYear: 2022, genre: "Technology" },
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "9780262046305", publishedYear: 2022, genre: "Technology" },
  ];

  for (const book of books) {
    const genre = await prisma.genre.findUnique({
      where: { name: book.genre },
    });

    if (!genre) {
      throw new Error(`Genre not found: ${book.genre}`);
    }

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publishedYear: book.publishedYear,
        genreId: genre.id,
      },
    });
  }

  console.log("Seed completed: 4 genres and 20 books.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
