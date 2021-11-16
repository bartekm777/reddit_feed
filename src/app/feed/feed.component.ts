import { Component, OnInit } from '@angular/core';
import { FeedService } from '../shared/api/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor(private readonly feedService: FeedService) {}

  ngOnInit(): void {}
}
