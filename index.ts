import { interval, Subject } from 'rxjs';
import { take, multicast } from 'rxjs/operators';

//#region Intro
// History
// Demo Code setup
// Compare with Promises and generators
// Start with building blocks

//#endregion

//#region  Building Blocks

// Observables (for events use api)
// Subscriber
// Observer
// Operators
// Subjects
// Schedulers

//#endregion

//#region intro with promises and generators

//#endregion

//#region Observables basics

// import { fromEvent, Observable, Subscriber } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { filter, mergeMap } from 'rxjs/operators';
// import { allBooks, IBook } from './data';

// function hello() {
//   return Observable.create((subscriber: Subscriber<any>) => {
//     setTimeout(() => {
//       if (allBooks && allBooks.length > 0) {
//         for (const book of allBooks) {
//           subscriber.next(book);
//         }
//       }
//       subscriber.complete();
//     }, 1000);
//   });
// }

// const observer = {
//   next: (res: any) => console.log(`res : ${res}`),
//   err: err => console.log(`err : ${err}`),
//   complete: () => console.log()
// };

// hello().subscribe(
//   (res: any) => console.log(`res : ${res}`)
// );

//#endregion

//#region Ways to create observables

// of
// from
// fromEvent
// new Observable()
// Observable.create();

// const btn = document.getElementById('btn__get_data');

// fromEvent(btn, 'click').subscribe(res =>
//   ajax('/api/books')
//     .pipe(
//       mergeMap(res => res.response),
//       filter((value: IBook) => value.publicationYear > 1950)
//     )
//     .subscribe(res => console.log(`Book : ${res.title}`))
// );

//#endregion

//#region multiple subscriber

// const source1$ = Observable.create((subscriber: Subscriber<any>) => {
//   const date = new Date().toLocaleTimeString();
//   subscriber.next(date);
//   subscriber.complete();
// });

// source1$.subscribe(currentTime => {
//   console.log(`Observer 1: ${currentTime}`);
// });

// setTimeout(() => {
//   source1$.subscribe(currentTime => {
//     console.log(`Observer 2: ${currentTime}`);
//   });
// }, 2000);

// setTimeout(() => {
//   source1$.subscribe(currentTime => {
//     console.log(`Observer 3: ${currentTime}`);
//   });
// }, 5000);

//#endregion

// ajax('/api/books')
//   .pipe(
//     mergeMap(data => data.response),
//     bookFilter(1950, true)
//   )
//   .subscribe(data => {
//     console.log(data.author);
//   });

// function bookFilter(year: number, log: boolean) {
//   return (source$: Observable<IBook>) =>
//     new Observable((subscriber: Subscriber<IBook>) => {
//       source$.subscribe(
//         val => {
//           if (val.publicationYear > year) {
//             if (log) {
//               console.log(`Book : ${val.title}`);
//             }
//             subscriber.next(val);
//           }
//         },
//         err => subscriber.error(err),
//         () => subscriber.complete()
//       );
//     });
// }

//#region

const interval$: any = interval(1000).pipe(
  take(4),
    multicast(new Subject()),
  // publish(),
  // publishLast(),
  // publishBehavior(20),
  // publishReplay()
  // refCount(),
  // share(),
);

interval$.subscribe(data => console.log(`Observer 1 ${data}`));

setTimeout(() => {
  interval$.subscribe(data => console.log(`Observer 2 ${data}`));
}, 1000);

setTimeout(() => {
  interval$.subscribe(data => console.log(`Observer 3 ${data}`));
}, 2000);

setTimeout(() => {
  interval$.subscribe(
    data => console.log(`Observer 4 ${data}`),
    error => console.log(`Observer 4 ${error}`),
    () => console.log('completed')
  );
}, 5000);

interval$.connect();

//#endregion
