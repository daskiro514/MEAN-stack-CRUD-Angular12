import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rss } from '../models/rss.model';

const baseUrl = 'https://test.urban-digital.co.il:7012/DeviceParameterValues/Parameters?deviceId=1574&token=rss'
// const baseUrl = 'http://localhost:5000/api/tutorials/rssfeed'

@Injectable({
  providedIn: 'root'
})

export class RssService {

  constructor(private http: HttpClient) { }

  getConfiguration(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getRssFeed(link: string): Observable<Rss[]> {
    return this.http.get<Rss[]>(link);
  }

}

