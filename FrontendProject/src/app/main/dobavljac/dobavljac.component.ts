import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DobavljacDialogComponent } from '../../dialogs/dobavljac-dialog/dobavljac-dialog.component';
import { Dobavljac } from '../../models/dobavljac';
import { DobavljacService } from '../../services/dobavljac.service';

@Component({
  selector: 'app-dobavljac',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatToolbarModule, MatSortModule, MatPaginatorModule],
  templateUrl: './dobavljac.component.html',
  styleUrl: './dobavljac.component.css'
})
export class DobavljacComponent implements OnInit, AfterViewInit{
  displayedColumns = ['id', 'naziv', 'adresa', 'kontakt', 'actions'];
  dataSource:MatTableDataSource<Dobavljac> = new MatTableDataSource<Dobavljac>([]);

  constructor(private service: DobavljacService, private dialog:MatDialog){}

  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public loadData(): void {
    this.service.getAllDobavljacs().subscribe(
      {next: (data) => {this.dataSource.data = data},
      error: (err) => console.log(err)}
    )
  }

  public openDialog(flag:number, id?:number, naziv?:string, adresa?:string, kontakt?:string):void {
    const ref = this.dialog.open(DobavljacDialogComponent, {data:{id, naziv, adresa, kontakt}});
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe(
      (response) => {
          this.loadData();
      }
    )
  }

}
