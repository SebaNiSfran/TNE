import { ComponentFixture, TestBed } from '@angular/core/testing';
import { E502Page } from './e502.page';

describe('E502Page', () => {
  let component: E502Page;
  let fixture: ComponentFixture<E502Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(E502Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
