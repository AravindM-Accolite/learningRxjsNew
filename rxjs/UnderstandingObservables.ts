import { from, Observable, Subscriber } from 'rxjs';
// basic understanding of promises
import { allBooks } from '../data';

let booksPromise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    if (allBooks && allBooks.length > 0) {
      resolve(allBooks);
    } else {
      reject('No book available');
    }
  }, 4000);
});

// booksPromise.then(function(response) {
//   console.log(response);
// });

// converting to es6 code

booksPromise = new Promise((resolve, reject) => {
  if (allBooks && allBooks.length > 0) {
    resolve(allBooks);
  } else {
    reject('No book available');
  }
});

// booksPromise.then(response => {
//   console.log(response);
// });

// understanding observables

// continous data stream or event emmision

function subscriber(sub: Subscriber<any>) {
  for (const book of allBooks) {
    sub.next(book);
  }
  setTimeout(() => {
    sub.complete();
  }, 3000);

  sub.add((data: any) => console.log('tear down', data));

  return () => console.log('Excuting before unsubscribe');
}

export const books$ = new Observable(subscriber);

// books$.subscribe(result => console.log(result));

// subscribe is similar to .then for promises except argument type,
// then excepts a callback functions for success and failure where as
// subscribe has 2 overloaded method one with 3 call backs (success, error , complete) or object which contains these 3 property functions

// Another example for subscribe overload

const num$ = from([1, 2, 3, 4, 5]);

const observer = {
  next: item => console.log(item),
  error: error => console.error(error),
  complete: () => console.log('Completed')
};

num$.subscribe(observer);

// creating custum observable

const custom$ = Observable.create(subscriber2 => {
  const val = 0;
  const interVal = setInterval(() => {
    subscriber2.next(val);
  }, 1000);

  if (val > 1000) {
    clearInterval(interVal);
    subscriber2.complete();
  }
});

// // Building Blocks

// 1. Observable and Observer  -  unicast
// 2. Operators --
// 3. Subject --  multi cast
// 4. Schedulers - when to emit
