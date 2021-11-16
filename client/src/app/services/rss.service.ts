import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rss } from '../models/rss.model';

// const baseUrl = 'https://test.urban-digital.co.il:7012/ExternalData/108?source=https://www.reutersagency.com/feed/?best-sectors=economy&post_type=best';

const baseUrl = 'http://localhost:5000/api/tutorials';

@Injectable({
  providedIn: 'root'
})

export class RssService {

  constructor(private http: HttpClient) { }

  // getRssFeed(): Observable<Rss[]> {
  //   return this.http.get<Rss[]>(baseUrl);
  // }

  getRssFeed(): Observable<Rss[]> {
    return this.http.get<Rss[]>(`${baseUrl}/rss`);
  }

}

