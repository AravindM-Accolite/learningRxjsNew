import { interval } from 'rxjs';
import { first, skip } from 'rxjs/operators';

interval(100)
  .pipe(
    skip(3),
    first()
  )
  .subscribe(val => console.log(`Values : ${val}`));

// skip
// skipLast
// skipUntil
// skipWhile
// take
// takeLast
// takeUntil
// takeWhile
// distinct
// distinctUntilChanged
// distinctUntilKeyChanged
// filter
// sample -> returns latest value on sample input observable emits value
// audit -> similar to sample but takes factory function as argument (Dynamic sample)
// throttle
// first
// last
// min
// max
// elementAt
// find
// findIndex
// single
