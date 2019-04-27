import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

const button = document.getElementById('btn__get_data');
const booksSection = document.getElementById('section__books');

const buttonClick$ = fromEvent(button, 'click');

buttonClick$.subscribe(event => {
  ajax('/api/books')
    .pipe(
      map(data => {
        return data.response;
      })
    )
    .subscribe(data => {
      for (const book of data) {
        booksSection.innerHTML += book.title + '</br>';
      }
    });
});
