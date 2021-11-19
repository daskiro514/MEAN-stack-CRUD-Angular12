import { Observable } from "rxjs";

export interface RssItem {
  title?: String;
}

export interface RssViewModel {
  bgColor?: string;
  color?: string;
  feed: Observable<RssItem[]>;
}
