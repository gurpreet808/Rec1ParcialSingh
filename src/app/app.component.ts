import { Component } from '@angular/core';
import { AuthService } from './servicios/auth.service';
import { GitHubService } from './servicios/git-hub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rec1ParcialSingh';

  constructor(public servAuth: AuthService) {
  }
}
