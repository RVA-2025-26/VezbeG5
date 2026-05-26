import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtiklService } from '../../services/artikl.service';
import { Artikl } from '../../models/artikl';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-artikl-dialog',
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule],
  standalone: true,
  templateUrl: './artikl-dialog.component.html',
  styleUrl: './artikl-dialog.component.css'
})
export class ArtiklDialogComponent {

  flag!:number;

  constructor(private service:ArtiklService,
              private snackBar:MatSnackBar,
              private dialogRef:MatDialogRef<ArtiklDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Artikl
    ) {}

  public add(): void {
    this.service.createArtikl(this.data).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Artikl has been successfully created.`, `OK`, {duration:2500});
      },
      error: (err) => {
        console.log(err.name);
        this.snackBar.open(`Something went wrong during POST request!`, `OK`, {duration:2500});
      }
    })
  }

  public update(): void{
    this.service.updateArtikl(this.data).subscribe({
      next: () => {
        this.dialogRef.close(1);
        this.snackBar.open(`Artikl has been successfully updated.`, `OK`, {duration:2500});
      },
      error: (err) => {
        console.log(err.name);
        this.snackBar.open(`Something went wrong during PUT request!`, `OK`, {duration:2500});
      }
    })
  }

  public delete(): void{
    this.service.deleteArtikl(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close(1);
        this.snackBar.open(`Artikl has been successfully deleted.`, `OK`, {duration:2500});
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
