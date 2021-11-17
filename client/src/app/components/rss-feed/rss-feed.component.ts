import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Rss } from 'src/app/models/rss.model';
import { RssConfiguration } from 'src/app/models/rssconfiguration.model';
import { RssService } from 'src/app/services/rss.service';

@Component({
  selector: 'app-rss-feed',
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.css']
})

export class RssFeedComponent implements OnInit {
  configuration: RssConfiguration = {
    source: '',
    refreshTime: 1,
    bgColor: '',
    color: ''
  };

  rsses?: Rss[];

  constructor(private rssService: RssService) { }

  ngOnInit(): void {
    this.retrieveRsses();
  }

  retrieveRsses(): void {
    this.rssService.getConfiguration().subscribe(
      config => {
        if (config) {
          this.configuration = config
          interval(config.refreshTime * 60 * 1000).pipe(
            switchMap(() => this.rssService.getRssFeed(config.source))
          ).subscribe(
            data => {
              this.rsses = data;
            },
            error => {
              console.log(error);
            }
          )
        }
      }
    )
  }
}