import { from } from 'rxjs';

// subscribe is similar to .then for promises except argument type,
// then excepts a callback functions for success and failure where as
// subscribe has 2 overloaded method one with 3 call backs (success, error , complete) or object which contains these 3 property functions

// Another example for subscribe overload

const num$ = from([1, 2, 3, 4, 5]);

const observer = {
  next: item => console.log(item),
  error: error => console.error(error),
  complete: () => console.log('Completed')
};

num$.subscribe(observer);
