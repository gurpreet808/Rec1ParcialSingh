import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GitHubUserData } from '../clases/git-hub-user-data';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  url_server: string = "https://api.github.com/";

  constructor(public _http: HttpClient) { }

  TraerDatosUsuario(user: string): Promise<GitHubUserData> {
    return firstValueFrom(this._http.get<GitHubUserData>(this.url_server + 'users/' + user));
  }
}
