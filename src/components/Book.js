import React from 'react'
import EventBus from '../utils/eventProxy';
// import {EventEmitter} from 'fbemitter';
// const emitter = new EventEmitter();

function changeShelfHandler(evt, book) {
  EventBus.trigger('changeShelf', evt.target.value, book);
}

function Book(props) {
  const bookStyle = {
    width: 128,
    height: 193,
    backgroundImage: `url(${props.book.imageLinks.thumbnail})`
  };
  const states = {
    move: 'Move to...',
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read',
    none: 'None'
  };
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={ bookStyle }></div>
        <div className="book-shelf-changer">
          <select value={props.book.shelf} onChange={(e) => changeShelfHandler(e, props.book)}>
            {Object.keys(states).map(key => {
              return <option key={key} value={key} disabled={key === 'move'}>{states[key]}</option>
            })}
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors.toString()}</div>
    </div>
  )
}

export default Book;