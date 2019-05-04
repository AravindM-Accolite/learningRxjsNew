import { interval } from 'rxjs';
import { buffer, bufferCount, take } from 'rxjs/operators';

// buffer operators

// 1. buffer

console.log('Emit the values after 1000ms ');

interval(100).pipe(
  buffer(interval(500)),
  take(3)
);
// .subscribe(val => console.log(`Values : ${val}`));

// 2. buffer count

interval(100).pipe(bufferCount(4));
// .subscribe(val => console.log(`Values : ${val}`));

interval(100).pipe(
  take(10),
  bufferCount(4, 1)
);
// .subscribe(val => console.log(`Values : ${val}`));

// similar operators
// 3. BufferTime
// 4. bufferToggle
// 5. bufferWhen
// 6. window
// 7. windowCount
// 8. windowTime
// 9. windowToggle
// 10. windowWhen

// buffer gives values (Array) while window is similar except it gives observable
