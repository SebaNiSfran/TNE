import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevalidarTnePage } from './revalidar-tne.page';

describe('RevalidarTnePage', () => {
  let component: RevalidarTnePage;
  let fixture: ComponentFixture<RevalidarTnePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidarTnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
