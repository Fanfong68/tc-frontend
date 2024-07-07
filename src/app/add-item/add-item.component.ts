import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../common/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  name = '';
  description = '';

  constructor(private itemService: ItemService, private router: Router) {}

  addItem() {
    if (this.name && this.description) {
      this.itemService.createItem({ id: 0, name: this.name, description: this.description }).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
