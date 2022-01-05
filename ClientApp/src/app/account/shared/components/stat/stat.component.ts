import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.less'],
})
export class StatComponent implements OnInit {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() value!: number;

  constructor() {}

  ngOnInit(): void {}
}
