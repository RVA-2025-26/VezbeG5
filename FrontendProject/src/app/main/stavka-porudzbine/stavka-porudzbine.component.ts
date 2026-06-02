import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StavkaPorudzbineDialogComponent } from '../../dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';
import { Artikl } from '../../models/artikl';
import { Porudzbina } from '../../models/porudzbina';
import { StavkaPorudzbine } from '../../models/stavka-porudzbine';
import { StavkaPorudzbineService } from '../../services/stavka-porudzbine.service';

@Component({
  selector: 'app-stavka-porudzbine',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatToolbarModule, MatButtonModule],
  templateUrl: './stavka-porudzbine.component.html',
  styleUrl: './stavka-porudzbine.component.css'
})
export class StavkaPorudzbineComponent implements OnInit, OnChanges{
  
  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena', 'artikl', 'actions'];
  dataSource!:MatTableDataSource<StavkaPorudzbine>;

  @Input()
  childSelectedPorudzbina!:Porudzbina;

  constructor(private service:StavkaPorudzbineService, private dialog:MatDialog){}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  public loadData():void {
    this.service.getStavkeByPorudzbina(this.childSelectedPorudzbina.id).subscribe(
      {next: (data) => {this.dataSource = new MatTableDataSource<StavkaPorudzbine>(data)},
      error: (err)=> console.log(err)
      }
    )
  }

  public openDialog(flag:number, id?:number, redniBroj?:number, kolicina?:number, jedinicaMere?:string, cena?:number, artikl?:Artikl):void {
    const ref = this.dialog.open(StavkaPorudzbineDialogComponent, {data: {id, redniBroj, kolicina, jedinicaMere, cena, artikl}});
    ref.componentInstance.flag = flag;
    ref.componentInstance.data.porudzbina = this.childSelectedPorudzbina;
    ref.afterClosed().subscribe(
      (response) => {
        if(response === 1) {
          this.loadData();
        }
      }
    )
  }

}
