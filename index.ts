import { concat, from, interval, of } from 'rxjs';
import { allBooks } from './data';

//creating observables from data or object

const source1$ = of('Hello', 'Everyone', 2019);

const source2$ = from(allBooks);

const source3$ = interval(1000);

// combining observables

concat(source1$, source2$).subscribe(val => {
  console.log(val);
});
