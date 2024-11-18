import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resumen5Component } from './resumen5.component';

describe('Resumen5Component', () => {
  let component: Resumen5Component;
  let fixture: ComponentFixture<Resumen5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resumen5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resumen5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
