import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { CoursesService } from '../../services/courses';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
    private coursesService: CoursesService,
  ) {
  }

  ngOnInit(): void {
  }

  handleConfirm(): void {
    this.coursesService.removeItem(this.id)
      .subscribe(
        () => {
          this.dialogRef.close();
        },
      );
  }

  handleDismiss(): void {
    this.dialogRef.close();
  }

}
