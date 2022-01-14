import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  Subscription,
} from 'rxjs';
import { HeroSearchService } from '../hero.service';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.scss'],
})
export class SubComponent implements OnInit, OnDestroy {
  @Output() clicked = new EventEmitter<string>();
  data$ = this.heroService.search('');
  heroForm = new FormGroup({
    searchText: new FormControl(''),
  });
  navStart: Observable<NavigationStart>;

  #subscription!: Subscription;

  constructor(private heroService: HeroSearchService, router: Router, private activatedRoute: ActivatedRoute) {
    this.#subscription = this.heroService.leaker.subscribe((value) => {
      console.log('leaker', value);
    });
    // Create a new Observable that publishes only the NavigationStart event
    this.navStart = router.events.pipe(
      filter((evt) => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit(): void {
    // this.heroService.search('n').subscribe((value) => {
    //   console.log(value);
    // });
    this.navStart.subscribe(() =>
      console.log('Navigation Started!')
    );

    this.heroService.leaker.next(Math.random());
    const searchControl = this.heroForm.get('searchText');
    searchControl?.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe((value: string) => {
        console.log('Calling search with ' + value);
        this.data$ = this.heroService.search(value);
      });
  }

  ngOnDestroy(): void {
    this.#subscription.unsubscribe();
  }

  handleClick() {
    this.clicked.emit('clicked');
  }
}
