import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarTnePage } from './recuperar-tne.page';

describe('RecuperarTnePage', () => {
  let component: RecuperarTnePage;
  let fixture: ComponentFixture<RecuperarTnePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarTnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
