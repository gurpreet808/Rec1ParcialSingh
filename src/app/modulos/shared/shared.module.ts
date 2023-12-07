import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitHubDataComponent } from '../../componentes/git-hub-data/git-hub-data.component';

@NgModule({
  declarations: [
    GitHubDataComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GitHubDataComponent
  ]
})
export class SharedModule { }
