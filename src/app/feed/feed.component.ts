import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { FeedService } from '../shared/api/feed.service';
import { Feed, Post } from '../shared/model/app.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  public feed?: Feed;
  public pageSizeControl!: FormControl;
  public showDetails = false;
  public currentPost?: Post;

  public get posts() {
    return this.feed?.posts || [];
  }

  public get firstPost() {
    return this.feed?.posts[0];
  }

  public get lastPost() {
    return this.feed ? this.feed.posts[this.feed.posts.length - 1] : null;
  }

  private pageChangeSubject = new BehaviorSubject<{
    before?: string;
    after?: string;
  }>({});

  constructor(
    private readonly feedService: FeedService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.pageSizeControl = new FormControl(10);

    this.pageSizeControl.valueChanges.pipe(
      startWith(this.pageSizeControl.value)
    );

    combineLatest([
      this.pageChangeSubject.asObservable(),
      this.pageSizeControl.valueChanges.pipe(
        tap(() => {
          this.pageChangeSubject.next({});
        }),
        startWith(this.pageSizeControl.value)
      ),
    ])
      .pipe(
        switchMap(([pageChange, pageSize]) =>
          this.feedService.getFeed(
            pageSize,
            pageChange.after,
            pageChange.before
          )
        )
      )
      .subscribe((feed) => {
        if (feed.posts.length > 0) {
          this.feed = feed;
        }
      });
  }

  public handleNextClick(): void {
    this.pageChangeSubject.next({ after: this.lastPost?.name });
  }

  public handlePreviousClick(): void {
    this.pageChangeSubject.next({ before: this.firstPost?.name });
  }

  public handlePostClick(post: Post): void {
    this.currentPost = post;
    this.toggleShowDetails();
  }

  public toggleShowDetails(): void {
    this.showDetails = !this.showDetails;
  }
}
