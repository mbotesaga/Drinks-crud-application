import { Component, OnInit,ViewChild } from '@angular/core';
import { AddEditComponent } from './add-edit/add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from './services/service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _drinkService: ServiceService,
    private _coreService: CoreService
  ){}

  ngOnInit(): void {
    this.getDrinksList();
  }

  OpenEdditDrinkForm(){
    const dialogRef = this._dialog.open(AddEditComponent,{
    width: '500px', // Set width as needed
    height: '400px', // Set height as needed
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getDrinksList();
        }
      },
    });
  }

  getDrinksList(){
    this._drinkService.getDrinksList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteDrinks(id: number){
    this._drinkService.deleteDrink(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Drink deleted successfully!', 'done')
        this.getDrinksList();
      },
      error: console.log,
    });
  }

  openEdditForm(data: any){
    const dialogRef = this._dialog.open(AddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getDrinksList();
        }
      }
    })
  }
}
