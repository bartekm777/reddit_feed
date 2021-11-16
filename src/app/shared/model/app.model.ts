export interface Feed {
  after: string;
  before: string;
  posts: Post[];
}

export interface Post {
  name: string;
  thumbnail: string;
  created: Date;
  num_comments: number;
  author: string;
  score: number;
  title: string;
  selftext: string;
}

export interface FeedResponse {
  data: {
    after: string;
    before: string;
    children: {
      data: Post;
    }[];
  };
}

export type PageSize = 5 | 10 | 25;
