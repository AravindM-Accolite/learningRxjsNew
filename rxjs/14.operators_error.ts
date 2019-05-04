import { of } from 'rxjs';
import { catchError, map, throwIfEmpty } from 'rxjs/operators';

of('a', 10)
  .pipe(
    map(v => v.toUpperCase()),
    catchError(err => of(undefined)),
  )
  .subscribe(
    res => {
      if (res) {
        console.log(res);
      }
    },
    err => console.log(err),
    () => console.log('complete')
  );


// throwIfEmpty -> if nothing gets emmited and observable gets complete it throws error
// onErrorResumeNext -> will switch to new observable stream if error occurs
// retry 
// retryWhen 
// timeout
// timeoutWith



