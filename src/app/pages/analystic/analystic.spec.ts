import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Analystic } from './analystic';

describe('Analystic', () => {
  let component: Analystic;
  let fixture: ComponentFixture<Analystic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Analystic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Analystic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
