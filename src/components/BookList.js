import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

function BookList(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {props.bookShelfs.map(shelf => {
          return (
            <BookShelf shelf={shelf} key={shelf.name} />
          )
        })}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default BookList;
