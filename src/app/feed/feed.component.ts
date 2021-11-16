import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, startWith, Subject } from 'rxjs';
import { FeedService } from '../shared/api/feed.service';
import { Feed, PageSize } from '../shared/model/app.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  public feed?: Feed;
  public pageSizeControl!: FormControl;

  public get posts() {
    return this.feed?.posts || [];
  }

  public get firstPost() {
    return this.feed?.posts[0];
  }

  public get lastPost() {
    return this.feed ? this.feed.posts[this.feed.posts.length - 1] : null;
  }

  public get pageSize(): PageSize {
    return this.pageSizeControl.value;
  }

  constructor(private readonly feedService: FeedService) {}

  ngOnInit(): void {
    this.pageSizeControl = new FormControl(10);

    this.pageSizeControl.valueChanges
      .pipe(startWith(this.pageSize))
      .subscribe(() => {
        this.updateFeed();
      });
  }

  updateFeed() {
    this.feedService.getFeed(this.pageSize).subscribe((feed) => {
      this.feed = feed;
    });
  }
}
