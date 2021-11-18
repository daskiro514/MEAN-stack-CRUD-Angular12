import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RssItem } from '../models/rss.model';
import { RssConfiguration } from '../models/rssconfiguration.model';

const configURl = 'https://test.urban-digital.co.il:7012/DeviceParameterValues/Parameters?deviceId=1574&token=rss'
const rssProxiUrl = 'https://test.urban-digital.co.il:7012/ExternalData/108'

@Injectable({
  providedIn: 'root'
})

export class RssService {

  constructor(private http: HttpClient) { }

  getConfiguration(): Observable<RssConfiguration> {
    return this.http.get<RssConfiguration>(configURl);
  }

  getRssFeed(source: string): Observable<RssItem[]> {
    return this.http.get<RssItem[]>(`${rssProxiUrl}?source=${source}`);
  }

}

