import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { IBook } from '../data';

const source$ = of(1, 2, 3, 4, 5);

// operators takes function as argument and returns another function

const doubler = map((val: number) => val * 2);

// return function takes observable and returns another observables

const doubler$ = doubler(source$);

// doubler$.subscribe(val => {
//   console.log(val);
// });

// but no one uses in these way. rather it is used as below

source$.pipe(map(val => val * 2));

// chaining of pipes

source$.pipe(
  map(val => val * 2),
  filter(val => val > 5)
);

ajax('/api/books')
  .pipe(
    map(data => {
      return data.response;
    })
  )
  .subscribe(data => {
    console.log(data);
  });

ajax('/api/books')
  .pipe(
    mergeMap(data => {
      return data.response;
    }),
    filter((data: IBook) => data.publicationYear > 1950),
    tap(book => console.log(`Book : ${book.title}`))
  )
  .subscribe(data => {
    console.log(data);
  });
