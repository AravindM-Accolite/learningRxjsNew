import { Observable, Subscriber } from 'rxjs';

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
