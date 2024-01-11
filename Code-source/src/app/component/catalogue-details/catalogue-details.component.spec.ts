import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueDetailsComponent } from './catalogue-details.component';

describe('CatalogueDetailsComponent', () => {
  let component: CatalogueDetailsComponent;
  let fixture: ComponentFixture<CatalogueDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogueDetailsComponent]
    });
    fixture = TestBed.createComponent(CatalogueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
