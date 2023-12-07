import { Component, OnInit } from '@angular/core';
import { GitHubUserData } from 'src/app/clases/git-hub-user-data';
import { GitHubService } from 'src/app/servicios/git-hub.service';

@Component({
  selector: 'app-git-hub-data',
  templateUrl: './git-hub-data.component.html',
  styleUrls: ['./git-hub-data.component.scss']
})
export class GitHubDataComponent implements OnInit {
  github_user: string = "gurpreet808";
  github_data: GitHubUserData | undefined;

  constructor(public servGitHub: GitHubService) {
    this.servGitHub.TraerDatosUsuario(this.github_user).then(
      (datos) => {
        console.log("datos", datos);
        this.github_data = datos;
      }
    ).catch(
      (error) => {
        console.log("error", error);
      }
    );
  }
  
  ngOnInit(): void {
  }
}
