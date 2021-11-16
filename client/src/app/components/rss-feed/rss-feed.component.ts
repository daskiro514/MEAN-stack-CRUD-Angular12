import { Component, OnInit } from '@angular/core';
import { Rss } from 'src/app/models/rss.model';
import { RssService } from 'src/app/services/rss.service';

@Component({
  selector: 'app-rss-feed',
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.css']
})

export class RssFeedComponent implements OnInit {
  rsses?: Rss[];

  constructor(private rssService: RssService) { }

  ngOnInit(): void {
    this.retrieveRsses();
  }

  retrieveRsses(): void {
    this.rssService.getRssFeed()
      .subscribe(
        data => {
          this.rsses = data;
        },
        error => {
          console.log(error);
        });
  }
}
