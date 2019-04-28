import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

// multicast()
// takes a subject as a parameter
// must call connect() to begin execution

// refCount()
// Executes when observers > 0

// publish()
// thin wrapper about multicast()
// not required to pass it a subject

// share()
// Executes when observers > 0
// re-subscribes as necessary

// Asycn Subject

// publishLast()
// publish the last value to all observers

// Behaviour subject
// publishBehavior()

// Reply subject
// publishReplay()

const interval$: any = interval(1000).pipe(
  take(4)
  // multicast(new Subject()),
  // publish(),
  // publishLast(),
  // publishBehavior(20),
  // publishReplay()
  // refCount(),
  // share(),
);

interval$.subscribe(data => console.log(`Observer 1 ${data}`));

setTimeout(() => {
  interval$.subscribe(data => console.log(`Observer 2 ${data}`));
}, 1000);

setTimeout(() => {
  interval$.subscribe(data => console.log(`Observer 3 ${data}`));
}, 2000);

setTimeout(() => {
  interval$.subscribe(
    data => console.log(`Observer 4 ${data}`),
    error => console.log(`Observer 4 ${error}`),
    () => console.log('completed')
  );
}, 5000);

// interval$.connect();
