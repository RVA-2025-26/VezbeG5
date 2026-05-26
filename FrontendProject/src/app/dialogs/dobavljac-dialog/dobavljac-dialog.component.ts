import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Artikl } from '../../models/artikl';
import { Dobavljac } from '../../models/dobavljac';
import { DobavljacService } from '../../services/dobavljac.service';
import { ArtiklDialogComponent } from '../artikl-dialog/artikl-dialog.component';

@Component({
  selector: 'app-dobavljac-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dobavljac-dialog.component.html',
  styleUrl: './dobavljac-dialog.component.css'
})
export class DobavljacDialogComponent {
  
  flag!:number;

  constructor(private service:DobavljacService,
              private snackBar:MatSnackBar,
              private dialogRef:MatDialogRef<DobavljacDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Dobavljac
    ) {}

  public add(): void {
    this.service.createDobavljac(this.data).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Dobavljac has been successfully created.`, `OK`, {duration:2500});
      },
      error: (err) => {
        console.log(err.name);
        this.snackBar.open(`Something went wrong during POST request!`, `OK`, {duration:2500});
      }
    })
  }

  public update(): void{
    this.service.updateDobavljac(this.data).subscribe({
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
    this.service.deleteDobavljac(this.data.id).subscribe({
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

}
