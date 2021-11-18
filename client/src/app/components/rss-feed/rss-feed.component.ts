import { Component, OnInit } from '@angular/core';
import { interval, Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RssViewModel } from 'src/app/models/rss.model';
import { RssConfiguration } from 'src/app/models/rssconfiguration.model';
import { RssService } from 'src/app/services/rss.service';

@Component({
  selector: 'app-rss-feed',
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.css']
})

export class RssFeedComponent implements OnInit {
  viewModel$?: Observable<RssViewModel>;

  constructor(private readonly rssService: RssService) { }

  ngOnInit() {
    this.viewModel$ = this.rssService.getConfiguration()
      .pipe(map<RssConfiguration, RssViewModel>(config => ({
        bgColor: config.bgColor,
        color: config.color,
        feed: timer(0, (config.refreshTime || 10) * 60 * 1000)
          .pipe(switchMap(() => this.rssService.getRssFeed(config.source)))
      })));
  }
}
