import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent {
  @Input() name: string;
  constructor() { }

  @Output() onClicked = new EventEmitter<string>();
  handleClick() {
    this.onClicked.emit(this.name);
  }

}
