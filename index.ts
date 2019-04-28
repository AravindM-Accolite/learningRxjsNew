import { Observable, Subscriber } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { IBook } from './data';

ajax('/api/books').pipe(
  mergeMap(data => data.response),
  filter((data: IBook) => data.publicationYear > 1950),
  tap(book => console.log(`Tap : ${book.title}`))
);
//   .subscribe(data => console.log(`Value: ${data.title}`));


