import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenwearComponent } from './womenwear.component';

describe('WomenwearComponent', () => {
  let component: WomenwearComponent;
  let fixture: ComponentFixture<WomenwearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WomenwearComponent]
    });
    fixture = TestBed.createComponent(WomenwearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
