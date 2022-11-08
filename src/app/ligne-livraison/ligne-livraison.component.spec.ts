import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneLivraisonComponent } from './ligne-livraison.component';

describe('LigneLivraisonComponent', () => {
  let component: LigneLivraisonComponent;
  let fixture: ComponentFixture<LigneLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigneLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
