import { of, timer } from 'rxjs';
import {
  combineAll,
  concatAll,
  delay,
  exhaust,
  map,
  mergeAll,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';

// combine all

const source1$ = timer(4000, 1000);
const source2$ = timer(2000, 2000);

of(source1$, source2$).pipe(
  combineAll(),
  take(10)
);
// .subscribe(([val1, val2]) => {
//   console.log(`value : ${val1}`, val2);
// });

//

const fSource1$ = of(1, 2, 3, 4, 5, 6);
const fSource2$ = of(7, 8, 9);

of(fSource1$, fSource2$).pipe(concatAll());
// .subscribe(res => console.log(`values : ${res}`));

// need to understand in deep

const eSource1$ = of(1, 2, 3).pipe(delay(100));
const eSource2$ = of(4, 5, 6);
const eSource3$ = of(7, 8, 9, 10).pipe(delay(400));

of(eSource1$, eSource2$, eSource3$).pipe(exhaust());
// .subscribe(res => console.log(`Exhaust Values : ${res}`));

of(eSource1$, eSource2$, eSource3$).pipe(mergeAll());
// .subscribe(res => console.log(`Merged Values : ${res}`));

// withLatestFrom

const a$ = timer(0, 300).pipe(
  take(4),
  tap(val => console.log(`A got emmitted : ${val}`)),
  map(i => `A${i}`)
);
const b$ = timer(0, 400).pipe(
  take(10),
  tap(val => console.log(`B got emmitted : ${val}`)),
  map(i => `B${i}`)
);
const c$ = of('C').pipe(delay(10));

a$.pipe(withLatestFrom(b$, c$)).subscribe(val => console.log(`value : ${val}`));
