import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PorudzbinaService } from '../../services/porudzbina.service';
import { Porudzbina } from '../../models/porudzbina';
import { Dobavljac } from '../../models/dobavljac';
import { PorudzbinaDialogComponent } from '../../dialogs/porudzbina-dialog/porudzbina-dialog.component';

@Component({
  selector: 'app-porudzbina',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatToolbarModule, DatePipe],
  templateUrl: './porudzbina.component.html',
  styleUrl: './porudzbina.component.css'
})
export class PorudzbinaComponent implements OnInit{
  displayedColumns = ['id', 'datumPorudzbine', 'datumIsporuke', 'iznos', 'placeno', 'dobavljac', 'actions'];
  dataSource!:MatTableDataSource<Porudzbina>;

  constructor(private service:PorudzbinaService, private dialog:MatDialog){}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData():void {
    this.service.getAllPorudzbinas().subscribe({
      next: (data) => {this.dataSource = new MatTableDataSource<Porudzbina>(data)},
      error: (err) => console.log(err)
    })
  }

  public openDialog(flag:number, id?:number, datumPorudzbine?:Date, datumIsporuke?:Date, iznos?:number, placeno?:boolean, dobavljac?:Dobavljac):void {
    const ref = this.dialog.open(PorudzbinaDialogComponent, {data: {id, datumPorudzbine, datumIsporuke, iznos, placeno, dobavljac}});
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe(
      (response) => {
        if(response===1) {
          this.loadData();
        }
      }
    )
  }


}
