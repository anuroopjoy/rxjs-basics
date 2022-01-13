import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-route2',
  templateUrl: './route2.component.html',
  styleUrls: ['./route2.component.scss'],
})
export class Route2Component implements OnInit, OnDestroy {
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
