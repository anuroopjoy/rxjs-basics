import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'rxjs-basics';
  #observable = new Observable(sequenceSubscriber);
  // #multicast = new Observable(multicastSequenceSubscriber());
  #multicast = new Subject<number>();
  showChild = true;

  ngOnInit() {
    this.#multicast.subscribe({
      next: (value) => {
        console.log('ngOnInit ' + value);
      },
      error: (value) => {
        console.log('ngOnInit error ' + value);
      },
      complete: () => {
        console.log('ngOnInit complete');
      },
    });
    this.#multicast.subscribe({
      next: (value) => {
        console.log('ngOnInit dupe ' + value);
      },
      complete: () => {
        console.log('ngOnInit complete');
      },
    });
  }

  ngAfterViewInit(): void {
    this.#multicast.subscribe((value) => {
      console.log('ngAfterViewInit ' + value);
    });
    let count = 1;
    const interval = setInterval(() => {
      this.#multicast.next(Math.random());
      ++count;
      if (count > 3) {
        clearInterval(interval);
      }
    }, 1000);
  }

  print(msg: string) {
    console.log(msg);
  }
}

function multicastSequenceSubscriber() {
  const seq = [Math.random(), Math.random(), Math.random()];
  // Keep track of each observer (one for every active subscription)
  const observers: Observer<unknown>[] = [];
  // Still a single timeoutId because there will only ever be one
  // set of values being generated, multicasted to each subscriber
  let timeoutId: any;

  // Return the subscriber function (runs when subscribe()
  // function is invoked)
  return (observer: Observer<unknown>) => {
    observers.push(observer);
    // When this is the first subscription, start the sequence
    if (observers.length === 1) {
      const multicastObserver: Observer<number> = {
        next(val) {
          // Iterate through observers and notify all subscriptions
          observers.forEach((obs) => obs.next(val));
        },
        error() {
          /* Handle the error... */
        },
        complete() {
          // Notify all complete callbacks
          observers.slice(0).forEach((obs) => obs.complete());
        },
      };
      doSequence(multicastObserver, seq, 0);
    }

    return {
      unsubscribe() {
        // Remove from the observers array so it's no longer notified
        observers.splice(observers.indexOf(observer), 1);
        // If there's no more listeners, do cleanup
        if (observers.length === 0) {
          clearTimeout(timeoutId);
        }
      },
    };

    // Run through an array of numbers, emitting one value
    // per second until it gets to the end of the array.
    function doSequence(
      sequenceObserver: Observer<number>,
      arr: number[],
      idx: number
    ) {
      timeoutId = setTimeout(() => {
        console.log('Emitting ' + arr[idx]);
        sequenceObserver.next(arr[idx]);
        if (idx === arr.length - 1) {
          sequenceObserver.complete();
        } else {
          doSequence(sequenceObserver, arr, ++idx);
        }
      }, 1000);
    }
  };
}

function sequenceSubscriber(observer: Observer<number>) {
  const seq = [Math.random(), Math.random(), Math.random()];
  let timeoutId: any;

  // Will run through an array of numbers, emitting one value
  // per second until it gets to the end of the array.
  function doInSequence(arr: number[], idx: number) {
    timeoutId = setTimeout(() => {
      observer.next(arr[idx]);
      if (idx === arr.length - 1) {
        observer.complete();
      } else {
        doInSequence(arr, ++idx);
      }
    }, 1000);
  }

  doInSequence(seq, 0);

  // Unsubscribe should clear the timeout to stop execution
  return {
    unsubscribe() {
      clearTimeout(timeoutId);
    },
  };
}
