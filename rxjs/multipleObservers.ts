import { Observable, Subscriber } from 'rxjs';

const source1$ = Observable.create((subscriber: Subscriber<any>) => {
  const date = new Date().toLocaleTimeString();
  subscriber.next(date);
  subscriber.complete();
});

source1$.subscribe(currentTime => {
  console.log(`Observer 1: ${currentTime}`);
});

setTimeout(() => {
  source1$.subscribe(currentTime => {
    console.log(`Observer 2: ${currentTime}`);
  });
}, 2000);

setTimeout(() => {
  source1$.subscribe(currentTime => {
    console.log(`Observer 3: ${currentTime}`);
  });
}, 4000);
