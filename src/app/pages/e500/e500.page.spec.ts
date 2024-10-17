import { ComponentFixture, TestBed } from '@angular/core/testing';
import { E500Page } from './e500.page';

describe('E500Page', () => {
  let component: E500Page;
  let fixture: ComponentFixture<E500Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(E500Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
