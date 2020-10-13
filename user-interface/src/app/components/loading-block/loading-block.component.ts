import { Component, OnInit } from '@angular/core';
import { LoadService } from '../../services/load/load.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loading-block',
  templateUrl: './loading-block.component.html',
  styleUrls: ['./loading-block.component.css']
})
export class LoadingBlockComponent implements OnInit {
  toShow: boolean;
  private subjectToShow: Subject<boolean>;
  constructor(
    private loadService: LoadService,
  ) { }

  updateShow(show: boolean) {
    this.loadService.updateShow(show);
  }

  ngOnInit(): void {
    this.subjectToShow = this.loadService.getSubjectToShow();
    this.subjectToShow.subscribe((toShow) => {
      this.toShow = toShow;
    });
  }

}
