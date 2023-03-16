import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../NewsService';
import { Subscription } from 'rxjs';
import { Article } from '../models';

@Component({
  selector: 'app-display-news',
  templateUrl: './display-news.component.html',
  styleUrls: ['./display-news.component.css']
})
export class DisplayNewsComponent implements OnInit, OnDestroy {

  newsSub!: Subscription
  articles: Article[] = []

  constructor(private newsSvc: NewsService) { }

  ngOnInit(): void {
    console.debug("Subscribing to news service")
    this.newsSub = this.newsSvc.onNews.subscribe(
      // receive broadcasts from service
      (sources) => { this.articles = sources }
    )
  }
  ngOnDestroy(): void {
    this.newsSub.unsubscribe()
  }
}
