import { interval, Observable, Subject, Subscriber } from 'rxjs';
import { take } from 'rxjs/operators';

// Child class of the Observable class
// it can work as observable as well as observer
// have state and maintain a list of observers
// works for multicast

const source1$ = Observable.create((subscriber: Subscriber<any>) => {
  const date = new Date().valueOf();
  subscriber.next(date);
  subscriber.complete();
});

source1$.subscribe(data => console.log(`Observer 1 : ${data}`));
source1$.subscribe(data => console.log(`Observer 2 : ${data}`));

// as observable

const subject$ = new Subject();

subject$.subscribe(data => console.log(`Observer 1 : ${data}`));
subject$.subscribe(data => console.log(`Observer 2 : ${data}`));

// subject$.next(new Date().valueOf());
// subject$.complete();

// as proxy observer

const interval$ = interval(1000).pipe(take(5));

interval$.subscribe(subject$);
