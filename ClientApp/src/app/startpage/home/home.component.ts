import { Component } from '@angular/core';
import { Category, StartpageService } from '..';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  selectedCategory!: Category;
  searchTextInput!: string;
  searchText!: string;

  filter(category: Category) {
    this.selectedCategory = category;
  }

  search() {
    this.searchText = this.searchTextInput;
  }
}
