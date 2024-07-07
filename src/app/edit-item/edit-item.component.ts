import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService, Item } from '../common/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  item: Item = { id: 0, name: '', description: '' };

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemService.getItem(+id).subscribe(item => {
        this.item = item;
      });
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  editItem() {
    if (this.item.name && this.item.description) {
      this.itemService.updateItem(this.item.id, this.item).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
