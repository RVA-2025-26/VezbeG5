import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PorudzbinaService } from '../../services/porudzbina.service';
import { Porudzbina } from '../../models/porudzbina';
import { Dobavljac } from '../../models/dobavljac';
import { PorudzbinaDialogComponent } from '../../dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { StavkaPorudzbineComponent } from '../stavka-porudzbine/stavka-porudzbine.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-porudzbina',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatToolbarModule, DatePipe, StavkaPorudzbineComponent, MatSortModule, MatPaginatorModule],
  templateUrl: './porudzbina.component.html',
  styleUrl: './porudzbina.component.css'
})
export class PorudzbinaComponent implements OnInit, AfterViewInit{
  displayedColumns = ['id', 'datumPorudzbine', 'datumIsporuke', 'iznos', 'placeno', 'dobavljac', 'actions'];
  dataSource:MatTableDataSource<Porudzbina> = new MatTableDataSource<Porudzbina>();
  
  parentSelectedPorudzbina!:Porudzbina;

  constructor(private service:PorudzbinaService, private dialog:MatDialog){}

  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public loadData():void {
    this.service.getAllPorudzbinas().subscribe({
      next: (data) => {this.dataSource.data = data},
      error: (err) => console.log(err)
    })
  }

  public openDialog(flag:number, id?:number, datumPorudzbine?:Date, datumIsporuke?:Date, iznos?:number, placeno?:boolean, dobavljac?:Dobavljac):void {
    const ref = this.dialog.open(PorudzbinaDialogComponent, {data: {id, datumPorudzbine, datumIsporuke, iznos, placeno, dobavljac}});
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe(
      (response) => {
          this.loadData();
      }
    )
  }

  public selectRow(row:Porudzbina){
    this.parentSelectedPorudzbina = row;
  }

}
