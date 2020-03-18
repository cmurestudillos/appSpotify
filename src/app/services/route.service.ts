import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RouteService {

  previousUrl: string;
  currentUrl: string;

  constructor(private _router: Router) {}

  public registerUrls() {
    this.currentUrl = this._router.url;

    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }
}
