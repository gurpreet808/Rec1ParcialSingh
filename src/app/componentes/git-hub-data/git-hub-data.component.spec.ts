import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitHubDataComponent } from './git-hub-data.component';

describe('GitHubDataComponent', () => {
  let component: GitHubDataComponent;
  let fixture: ComponentFixture<GitHubDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GitHubDataComponent]
    });
    fixture = TestBed.createComponent(GitHubDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
