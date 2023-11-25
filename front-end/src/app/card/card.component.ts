import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Product from '../types/product';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnChanges {
  @Input() Image!: string;
  @Input() Title!: string;
  @Input() Price!: number;
  @Input() Id!: string;
  @Input() StartDate!: Date;
  @Input() EndDate!: Date;
  @Input() isUpcoming: boolean = false;
  @Input() hideBiddingBtn: boolean = true;

  targetDate!: Date;
  timeLeft: string = '';

  constructor(private myService: MyServiceService) {}

  ngOnInit() {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['EndDate']) {
      this.targetDate = new Date(this.EndDate);
    }
  }

  private updateCountdown() {
    let distance = 0;
    if (!this.isUpcoming) {
      if (this.targetDate) {
        const now = new Date().getTime();
        distance = this.targetDate.getTime() - now;
      }
    } else {
      distance = new Date(this.StartDate).getTime() - new Date().getTime();
    }
    if (distance <= 0) {
      this.timeLeft = 'Countdown expired';
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.timeLeft = `${days}D : ${hours}H : ${minutes}M : ${seconds}S`;
    }
  }
}

// if (distance <= 0) {
//   this.timeLeft = 'Countdown expired';
// } else {
//   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(
//     (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutes = Math.floor(
//     (distance % (1000 * 60 * 60)) / (1000 * 60)
//   );
//   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   this.timeLeft = `${days}D : ${hours}H : ${minutes}M : ${seconds}S`;
// }
