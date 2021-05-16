import {Component, Input} from '@angular/core';

@Component({
  selector: 'front-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() public title: string;
  @Input() public content: string
  @Input() public id: number
}
