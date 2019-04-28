import { interval, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

// cold vs hot obervables
// cold observables are those whose producer resides inside of observable creation
// one observer per execution
// it just works as unicast
// example are interval() and ajax()

// cold observable
// const interval$ = interval(1000).pipe(take(4));

// interval$.subscribe(data => console.log(`Observer 1 ${data}`));

// setTimeout(() => {
//   interval$.subscribe(data => console.log(`Observer 2 ${data}`));
// }, 1000);

// setTimeout(() => {
//   interval$.subscribe(data => console.log(`Observer 3 ${data}`));
// }, 2000);

// convert above cold observable to hot observable (multicast) multiple observer with same values by using subject

const interval$ = interval(1000).pipe(take(4));

const subject$ = new Subject();
interval$.subscribe(subject$);

subject$.subscribe(data => console.log(`Observer 1 ${data}`));

setTimeout(() => {
  subject$.subscribe(data => console.log(`Observer 2 ${data}`));
}, 1000);

setTimeout(() => {
  subject$.subscribe(data => console.log(`Observer 3 ${data}`));
}, 2000);
