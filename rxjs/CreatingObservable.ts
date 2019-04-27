import {
  concat,
  from,
  fromEvent,
  interval,
  Observable,
  of,
  Subscriber
} from 'rxjs';
import { allBooks } from '../data';

//creating observables from data or object

const source1$ = of('Hello', 'Everyone', 2019);

const source2$ = from(allBooks);

const button = document.getElementById('btn__get_data');

const buttonClick$ = fromEvent(button, 'click');

// buttonClick$.subscribe(event => {
//   console.log(event);
// });

const source3$ = interval(1000);

// combining observables

// concat(source1$, source2$).subscribe(val => {
//   console.log(val);
// });

const source4$ = Observable.create((subscriber: Subscriber<any>) => {
  let val = 0;
  const interval = setInterval(() => {
    if (val > 20) {
      subscriber.complete();
    }
    subscriber.next(val);
    ++val;
  });

  subscriber.add(() => {
    console.log('cleaning interval');
    clearInterval(interval);
  });
});

//   source4$.subscribe(val => {
//     console.log(val);
//   });
