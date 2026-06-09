import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Artikl } from '../../models/artikl';
import { StavkaPorudzbine } from '../../models/stavka-porudzbine';
import { ArtiklService } from '../../services/artikl.service';
import { StavkaPorudzbineService } from '../../services/stavka-porudzbine.service';

@Component({
  selector: 'app-stavka-porudzbine-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './stavka-porudzbine-dialog.component.html',
  styleUrl: './stavka-porudzbine-dialog.component.css'
})
export class StavkaPorudzbineDialogComponent implements OnInit{

  flag!:number;
  artikli:Artikl[] = [];

  constructor(private service:StavkaPorudzbineService,
              private snackBar:MatSnackBar,
              private dialogRef:MatDialogRef<StavkaPorudzbineDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: StavkaPorudzbine,
              private artiklService:ArtiklService
    ) {}

  ngOnInit(): void {
    this.artiklService.getAllArtikls().subscribe(
      (data) => this.artikli = data
    )
  }

    public add(): void {
      this.data.id = 0;
      this.service.createStavkaPorudzbine(this.data).subscribe({
        next: (data) => {
          this.dialogRef.close(1);
          this.snackBar.open(`Stavka porudzbine has been successfully created.`, `OK`, {duration:2500});
        },
        error: (err) => {
          console.log(err.name);
          this.snackBar.open(`Something went wrong during POST request!`, `OK`, {duration:2500});
        }
      })
    }
  
    public update(): void{
      this.service.updateStavkaPorudzbine(this.data).subscribe({
        next: () => {
          this.dialogRef.close(1);
          this.snackBar.open(`Dobavljac has been successfully updated.`, `OK`, {duration:2500});
        },
        error: (err) => {
          console.log(err.name);
          this.snackBar.open(`Something went wrong during PUT request!`, `OK`, {duration:2500});
        }
      })
    }
  
    public delete(): void{
      this.service.deleteStavkePorudzbine(this.data.id).subscribe({
        next: () => {
          this.dialogRef.close(1);
          this.snackBar.open(`Dobavljac has been successfully deleted.`, `OK`, {duration:2500});
        },
        error: (err) => {
          console.log(err.name);
          this.snackBar.open(`Something went wrong during DELETE request!`, `OK`, {duration:2500});
        }
      })
    }
  
    public cancel(): void{
      this.dialogRef.close(1);
      this.snackBar.open(`You've given up on changes!`, `OK`, {duration:2500});
    }

    public compare(a:any, b:any) {
      return a.id == b.id;
    }

}
