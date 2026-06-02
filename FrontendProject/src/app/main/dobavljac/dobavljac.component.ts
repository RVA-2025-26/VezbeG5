import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DobavljacDialogComponent } from '../../dialogs/dobavljac-dialog/dobavljac-dialog.component';
import { Dobavljac } from '../../models/dobavljac';
import { DobavljacService } from '../../services/dobavljac.service';

@Component({
  selector: 'app-dobavljac',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatToolbarModule],
  templateUrl: './dobavljac.component.html',
  styleUrl: './dobavljac.component.css'
})
export class DobavljacComponent implements OnInit{
  displayedColumns = ['id', 'naziv', 'adresa', 'kontakt', 'actions'];
  dataSource!:MatTableDataSource<Dobavljac>;

  constructor(private service: DobavljacService, private dialog:MatDialog){}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.service.getAllDobavljacs().subscribe(
      {next: (data) => {this.dataSource = new MatTableDataSource<Dobavljac>(data)},
      error: (err) => console.log(err)}
    )
  }

  public openDialog(flag:number, id?:number, naziv?:string, adresa?:string, kontakt?:string):void {
    const ref = this.dialog.open(DobavljacDialogComponent, {data:{id, naziv, adresa, kontakt}});
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe(
      (response) => {
        if(response === 1){
          this.loadData();
        }
      }
    )
  }

}
