import { Component, Input } from '@angular/core';
import { Post } from '../shared/model/app.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: Post;

  get created() {
    return new Date(this.post.created);
  }
}
