import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierLigneCommandeComponent } from './modifier-ligne-commande.component';

describe('ModifierLigneCommandeComponent', () => {
  let component: ModifierLigneCommandeComponent;
  let fixture: ComponentFixture<ModifierLigneCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierLigneCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierLigneCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
