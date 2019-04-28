import { asapScheduler, asyncScheduler, merge, of, queueScheduler } from 'rxjs';

console.log('Start script.');

let queue$ = of('QueueScheduler (synchronous)', queueScheduler);

let asap$ = of('AsapScheduler (async micro task)', asapScheduler);

let async$ = of('AsyncScheduler (async task)', asyncScheduler);

merge(queue$, asap$, async$).subscribe(value => console.log(value));

console.log('End script.');
