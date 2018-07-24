import React from 'react'
import { Route } from 'react-router-dom'
import EventBus from './utils/eventProxy'
// import {EventEmitter} from 'fbemitter';
// const emitter = new EventEmitter();

import * as BooksAPI from './BooksAPI'
import './App.css'

import SearchBar from './components/SearchBar'
import BookList from './components/BookList'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    // emitter.addListener('changeBookShelf', function(book, shelf) {
    //   BooksAPI.update(book, shelf).then(function(result) {
    //     console.log('updateBook suc!' + result);
    //   }).catch(function(error) {
    //     console.log('error: ' + error);
    //   })
    // });
    EventBus.on('changeShelf', (shelf, book) => {
      console.log(shelf, book)
      const newAllBooks = this.state.allBooks.map(b => {
        if (book.id === b.id) {
          b.shelf = shelf;
        }
        return b;
      });
      this.setState({
        allBooks: newAllBooks,
        bookShelfs: this.getShelfBooks(newAllBooks)
      });
    });
  }

  state = {
    allBooks: [],
    shelfsMap: {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want to Read',
      read: 'Read'
    },
    bookShelfs: []
  }

  getShelfBooks(books) {
    const crBooks = books.filter(book => book.shelf === 'currentlyReading');
    const wrBooks = books.filter(book => book.shelf === 'wantToRead');
    const rBooks = books.filter(book => book.shelf === 'read');
    const shelfs = [
      {name: this.state.shelfsMap.currentlyReading, books:crBooks}, 
      {name: this.state.shelfsMap.wantToRead, books:wrBooks},
      {name: this.state.shelfsMap.read, books: rBooks}
    ];
    return shelfs;
  }

  componentDidMount() {
    BooksAPI.getAll().then(result => {
      this.setState({
        allBooks: result,
        bookShelfs: this.getShelfBooks(result)
      });
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList bookShelfs={this.state.bookShelfs} />
        )}></Route>
        <Route path="/search" render={() => (
          <SearchBar />
        )}></Route>
      </div>
    )
  }
}

export default BooksApp
