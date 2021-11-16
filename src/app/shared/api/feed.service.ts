import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Feed, FeedResponse } from '../model/app.model';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly SUBREDDIT_NAME = 'sweden';

  constructor(private readonly http: HttpClient) {}

  getFeed(): Observable<Feed> {
    return this.http
      .get<FeedResponse>(`https://www.reddit.com/r/${this.SUBREDDIT_NAME}.json`)
      .pipe(
        switchMap((response) => {
          return of({
            ...response.data,
            posts: response.data.children.map((post) => post.data),
          });
        })
      );
  }
}
