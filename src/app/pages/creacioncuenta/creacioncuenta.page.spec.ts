import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreacioncuentaPage } from './creacioncuenta.page';

describe('CreacioncuentaPage', () => {
  let component: CreacioncuentaPage;
  let fixture: ComponentFixture<CreacioncuentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacioncuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
