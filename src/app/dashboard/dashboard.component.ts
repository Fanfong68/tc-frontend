import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ItemService, Item } from '../common/item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['index', 'id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Item>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.itemService.getItems().subscribe(items => {
      this.dataSource.data = items;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: Item, filter: string) => {
        const dataStr = (data.name + data.description).toLowerCase();
        return dataStr.indexOf(filter.trim().toLowerCase()) !== -1;
      };
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addItem() {
    this.router.navigate(['/add-item']);
  }

  editItem(item: Item) {
    this.router.navigate(['/edit-item', item.id]);
  }

  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(id).subscribe(() => {
        this.fetchItems();
      });
    }
  }
}
