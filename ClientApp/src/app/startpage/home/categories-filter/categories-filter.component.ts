import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StartpageService } from '../../shared/startpage.service';
import { Category } from '../..';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.less'],
})
export class CategoriesFilterComponent implements OnInit {
  @Input() selectedCategory!: Category;
  @Output() filter = new EventEmitter<Category>();

  isLoaded = false;
  categories: Category[] = [];

  constructor(
    private readonly service: StartpageService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.service.getCategories().subscribe(
      (result) => {
        this.categories = result as Category[];
        this.selectedCategory =
          this.categories.find((category) => category.name == 'All') ??
          this.categories[0];
        this.isLoaded = true;
      },
      (response) => {
        this.notification.create('error', 'Error', response.error.message);
        this.isLoaded = true;
      }
    );
  }

  onFilter(category: Category) {
    this.filter.emit(category);
  }
}
