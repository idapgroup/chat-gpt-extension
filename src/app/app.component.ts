import {Component, inject, isDevMode, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, from, take, takeUntil} from 'rxjs';

import {DestroySubscription} from './shared/classes/destroy-subscription';
import {StorageService} from './shared/modules/storage/classes/storage.service';
import {LAST_ROUTE_STORAGE_KEY} from './shared/static/consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends DestroySubscription implements OnInit {

  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.restoreUrlFromHistory();
    this.onRouteChanges();
  }

  private onRouteChanges() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroyStream$),
    ).subscribe((e) => {
      const url = (e as NavigationEnd).url;
      this.storageService.setItem(LAST_ROUTE_STORAGE_KEY, url);
    })
  }

  private restoreUrlFromHistory() {
    from(this.storageService.getItem<string>(LAST_ROUTE_STORAGE_KEY)).pipe(
      take(1),
      takeUntil(this.destroyStream$),
    ).subscribe(url => {
      if (url && !isDevMode()) {
        this.router.navigateByUrl(url)
      }
    })
  }
}
