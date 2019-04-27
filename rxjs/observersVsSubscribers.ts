import { Observable, Subscriber } from 'rxjs';

// When you create a Observable you pass a subscriber, which contains next error add and complete method

const source4$ = Observable.create((subscriber: Subscriber<any>) => {
  let val = 0;
  const interval = setInterval(() => {
    if (val > 20) {
      subscriber.complete();
    }
    subscriber.next(val);
    ++val;
  });

  subscriber.add(() => {
    console.log('cleaning interval');
    clearInterval(interval);
  });
});

// once you create an observable with subscriber you need to subscribe it with help of observer which will track for emmited values

const observer = {
  next: item => console.log(item),
  error: error => console.error(error),
  complete: () => console.log('Completed')
};

source4$.subscibe(observer);

// subscribe method can take either observer object which contains above 3 methds or you can pass 3 arguments one for method for each
