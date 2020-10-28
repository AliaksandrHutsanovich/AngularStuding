import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() courseTitle: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleClick(): void {
    this.router.navigate(['courses']);
  }

}
