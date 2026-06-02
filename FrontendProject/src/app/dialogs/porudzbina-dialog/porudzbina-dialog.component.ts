import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from '../../models/dobavljac';
import { Porudzbina } from '../../models/porudzbina';
import { PorudzbinaService } from '../../services/porudzbina.service';

@Component({
  selector: 'app-porudzbina-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './porudzbina-dialog.component.html',
  styleUrl: './porudzbina-dialog.component.css'
})
export class PorudzbinaDialogComponent {

  flag!:number;

  constructor(private service:PorudzbinaService,
              private snackBar:MatSnackBar,
              private dialogRef:MatDialogRef<PorudzbinaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Porudzbina
    ) {}

    public add(): void {
      this.service.createPorudzbina(this.data).subscribe({
        next: (data) => {
          this.dialogRef.close(1);
          this.snackBar.open(`Porudzbina has been successfully created.`, `OK`, {duration:2500});
        },
        error: (err) => {
          console.log(err.name);
          this.snackBar.open(`Something went wrong during POST request!`, `OK`, {duration:2500});
        }
      })
    }
  
    public update(): void{
      this.service.updatePorudzbina(this.data).subscribe({
        next: () => {
          this.dialogRef.close(1);
          this.snackBar.open(`Porudzbina has been successfully updated.`, `OK`, {duration:2500});
        },
        error: (err) => {
          console.log(err.name);
          this.snackBar.open(`Something went wrong during PUT request!`, `OK`, {duration:2500});
        }
      })
    }
  
    public delete(): void{
      this.service.deletePorudzbina(this.data.id).subscribe({
        next: () => {
          this.dialogRef.close(1);
          this.snackBar.open(`Porudzbina has been successfully deleted.`, `OK`, {duration:2500});
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
}
