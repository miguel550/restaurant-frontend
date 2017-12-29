import { Component } from '@angular/core';
import {CategoriesComponent} from './categories/categories.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CategoriesComponent]
})
export class AppComponent {
  title = 'Retaurant app';
}
