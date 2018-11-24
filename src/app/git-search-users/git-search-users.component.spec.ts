import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitSearchUsersComponent } from './git-search-users.component';

describe('GitSearchUsersComponent', () => {
  let component: GitSearchUsersComponent;
  let fixture: ComponentFixture<GitSearchUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitSearchUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitSearchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
