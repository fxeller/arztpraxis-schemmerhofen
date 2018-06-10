import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  content: Promise<string>;

  constructor(
    private route: ActivatedRoute,
    private contenService: ContentService
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: { contentId: string }) => {
        this.getContentById(data.contentId);
      });
  }

  getContentById(contentId: string): void {
    this.content = this.contenService.getContentById(contentId);
  }
}
