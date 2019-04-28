import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { IBook } from '../data';

// operators are generally created as functions which returns another function , that function accepts the observable and returns bservable

// function customOperator(config){
//     return function(source$){
//         return newSource$;
//     }
// }

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

function filterBooks(year: number, log: boolean) {
  return (source$: Observable<IBook>) =>
    new Observable((subscriber: Subscriber<any>) => {
      source$.subscribe(
        (book: IBook) => {
          if (book.publicationYear < year) {
            subscriber.next(book);
            if (log) {
              console.log(`Operator : ${book.title}`);
            }
          }
        },
        err => subscriber.error(err),
        () => subscriber.complete()
      );
    });
}

ajax('/api/books')
  .pipe(
    mergeMap<AjaxResponse, Observable<IBook>>(data => data.response),
    filterBooks(1950, true)
  )
  .subscribe((data: IBook) => console.log(`Value: ${data.title}`));

// we can wrap existing operators as well

function customFilter(year: number) {
  return filter((book: IBook) => book.publicationYear < year);
}

function printMe<T>(message: T): T {
  console.log(message);
  return message;
}

printMe<number>(10);
