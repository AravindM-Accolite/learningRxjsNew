import { Subject, timer } from 'rxjs';
import { map, switchAll, take, tap } from 'rxjs/operators';

// grouping values

const data = [
  { groupId: 1, name: 'Pratik', rollNum: 49, score: 64 },
  { groupId: 1, name: 'Rahul', rollNum: 50, score: 84 },
  { groupId: 1, name: 'Rajendra', rollNum: 51, score: 78 },
  { groupId: 2, name: 'Mayur', rollNum: 52, score: 74 },
  { groupId: 2, name: 'Mayank', rollNum: 53, score: 72 },
  { groupId: 2, name: 'Anuj', rollNum: 33, score: 68 },
  { groupId: 3, name: 'Baldeo', rollNum: 23, score: 81 },
  { groupId: 4, name: 'Siddharth', rollNum: 59, score: 82 }
];

// of(...data)
//   .pipe(groupBy(student => student.groupId))
//   .subscribe(res => console.log(`values : ${res}`, res instanceof Observable));

// of(...data)
//   .pipe(
//     groupBy(student => student.groupId),
//     mergeMap(group$ => group$.pipe(toArray()))
//   )
//   .subscribe(res => {
//     console.log('New group started');
//     for (const student of res) {
//       console.log(`Student : ${student.name}`);
//     }
//   });

// pairwise
// partition

// switchAll
// toArray
// zipAll

const source1$ = timer(0, 1000).pipe(
  tap(val => console.log(`s1 ${val}`, new Date())),
  map(val => `A: ${val}`),
  take(5)
);
const source2$ = timer(300, 1000).pipe(
  tap(val => console.log(`s2 ${val}`)),
  map(val => `B: ${val}`),
  take(5)
);
const source3$ = timer(1500, 2000).pipe(
  tap(val => console.log(`s3 ${val}`)),
  map(val => `C: ${val}`),
  take(5)
);

const subject = new Subject();
subject.pipe(switchAll()).subscribe(val => console.log(`values : ${val}`));

subject.next(source1$);

setTimeout(() => {
  subject.next(source2$);
}, 2000);

setTimeout(() => {
  subject.next(source3$);
}, 4000);
