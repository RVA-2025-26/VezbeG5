import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true, //kom
  imports: [CommonModule, RouterLink, RouterOutlet, MatSidenavModule, MatButtonModule, MatExpansionModule, MatIcon, MatNavList, MatSidenavContainer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontendProject';
}
