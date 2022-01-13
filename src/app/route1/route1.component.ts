import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-route1',
  templateUrl: './route1.component.html',
  styleUrls: ['./route1.component.scss'],
})
export class Route1Component implements OnInit, OnDestroy {
  #subscription!: Subscription;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.#subscription = this.activatedRoute.url.subscribe((url) =>
      console.log('The URL changed to: ' + url)
    );
  }

  ngOnDestroy(): void {
    this.#subscription.unsubscribe();
  }
}
