import React from 'react'

interface BookListProps {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: BookListProps) => {
  return (
    <section>
      <h2 className='font-bebas-neue text-4xl text-light-100'>Popular Books</h2>
    </section>
  )
}

export default BookList