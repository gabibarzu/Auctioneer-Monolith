import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.less'],
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input() date!: Date;

  private subscription!: Subscription;

  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  secondsInAMinute = 60;

  public timeDifference!: number;
  public secondsToDay!: number;
  public minutesToDay!: number;
  public hoursToDay!: number;
  public daysToDay!: number;

  private getTimeDifference() {
    this.timeDifference = new Date(this.date).getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: any) {
    this.secondsToDay = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.secondsInAMinute
    );
    this.minutesToDay = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.secondsInAMinute
    );
    this.hoursToDay = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.secondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDay = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.secondsInAMinute *
          this.hoursInADay)
    );
  }

  doubleDigit(nr: number) {
    return nr > 9 ? nr : '0' + nr;
  }

  ngOnInit() {
    this.getTimeDifference();
    this.subscription = interval(1000).subscribe((x) => {
      this.getTimeDifference();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
