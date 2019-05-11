import { empty, interval, of, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  concatMap,
  concatMapTo,
  delay,
  exhaustMap,
  expand,
  map,
  mapTo,
  mergeScan,
  pluck,
  reduce,
  scan,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

// concatMap

// concatMap subscribes next inner once previous inner is completed
// in final observer you will get inner observables subscribed value
// concatMaps takes argument as outer subscriber value
// for each outer subscriber inner observable gets subscribed

// of(100, 1500, 400, 100)
//   .pipe(
//     concatMap(delayVal => of(`Emit After ${delayVal}`).pipe(delay(delayVal)))
//   )
//   .subscribe(res => console.log(`VAlues : ${res}`));

console.log(`Start Time : ${new Date().getSeconds()}`);

interval(10).pipe(
  take(5),
  // tap(val => console.log(`Outer Observable : ${val}`)),
  concatMap(res1 =>
    timer(5000 - res1 * 1000, 1000).pipe(
      // tap(res2 => console.log(`Inner Observable : ${res2}`)),
      take(5)
    )
  )
);
//   .subscribe(val => console.log(`Value  : ${val}`, new Date().getSeconds()));
// major thing to notice is inner wont execute next until first is completed

// concatMapTo

// outer or source observable works as signal
// inner will emit result once notified.
// one change is it takes direct innerObservable as parameter and outer just work for signaling.
// not sure if outer's subscribed value can capture in inner

interval(5000).pipe(
  take(5),
  // tap(val => console.log(`Outer Observable : ${val}`)),
  concatMapTo(
    interval(1).pipe(
      // tap(res2 => console.log(`Inner Observable : ${res2}`)),
      take(5)
    )
  )
);
//   .subscribe(val => console.log(`Value  : ${val}`, new Date().getSeconds()));

// DefaultIfEmpty
// emits default value if observables comple without any next

// endWith
// startWith

// ExhaustMap

// similar to concatMap except ExhaustMap will reject the outer observable value if it comes while inner is still going on

interval(10).pipe(
  take(5),
  // tap(val => console.log(`Outer Observable : ${val}`)),
  exhaustMap(res1 =>
    timer(5000 - res1 * 1000, 1000).pipe(
      // tap(res2 => console.log(`Inner Observable : ${res2}`)),
      take(5)
    )
  )
);
//   .subscribe(
//     val => console.log(`Value  : ${val}`, new Date().getSeconds()),
//     err => console.log(`Error : ${err}`),
//     () => console.log(`Completed `)
//   );

of(100, 2000, 50, 1000).pipe(
  concatMap(res => of(res).pipe(delay(res)))
  //    exhaustMap(res1 => of(res1).pipe(delay(res1)))
);
//   .subscribe(
//     val => console.log(`Value  : ${val}`, new Date().getSeconds()),
//     err => console.log(`Error : ${err}`),
//     () => console.log(`Completed `)
//   );

// expand
// best suited for pagination
// make sure expand to finish else it qill fo infinte recursive

const source$ = ajax('/api/books');
let booksRes = [];

source$.pipe(
  delay(1000),
  expand(books => {
    booksRes = booksRes.concat(books.response);
    return booksRes.length < 20 ? source$ : empty();
  })
);
//   .subscribe(
//     val => {
//       console.log(`Books : ${val}`);
//     },
//     err => console.log(`Error : ${err}`),
//     () => {
//       console.log(booksRes);
//     }
//   );

// map

interval(100).pipe(
  map(val => val * val),
  take(4)
);
//   .subscribe(val => {
//       return console.log(`Values : ${val}`);
//   });

// mapTo

interval(100).pipe(
  mapTo('Hello'),
  take(3)
);
//   .subscribe(val => console.log(`Values : ${val}`));

// scan
// for accumulated values

interval(100).pipe(
  scan((acc, val) => acc + val, 0),
  take(3)
);
//   .subscribe(val => console.log(`Values : ${val}`));

// mergeScan
// similar to scan but returns observable

interval(100).pipe(
  mergeScan((acc, val) => of('a', 'b', acc + val), 0),
  take(3)
);
//   .subscribe(val => console.log(`Values : ${val}`));

// pluck
// pluck the property value from subscribed value

source$.pipe(
  concatMap(res => res.response),
  pluck('author')
);
//   .subscribe(val => {
//     console.log(`Value : ${val}`);
//   });

// reduce

// modified example of above pagination with reduce
source$.pipe(
  delay(1000),
  expand(books => {
    booksRes = booksRes.concat(books.response);
    return booksRes.length < 20 ? source$ : empty();
  }),
  map(response => response.response),
  reduce((acc, val) => acc.concat(val), [])
);
//   .subscribe(res => console.log(`Result : ${res.length}`));

// switchMap/ FlatMap
// similar to exhaustMap except exhaust map rejects outer observables while switchMap rejects inner observables to further emits remaining iterations

interval(5000)
  .pipe(
    take(5),
    switchMap(res1 =>
      timer(5000 - res1 * 1000, 1000).pipe(
        tap(val => console.log(`Inner observable : ${val}`)),
        take(5)
      )
    )
  )
  .subscribe(
    val => console.log(`Value  : ${val}`, new Date().getSeconds()),
    err => console.log(`Error : ${err}`),
    () => console.log(`Completed `)
  );
