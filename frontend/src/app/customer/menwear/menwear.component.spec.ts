import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenwearComponent } from './menwear.component';

describe('MenwearComponent', () => {
  let component: MenwearComponent;
  let fixture: ComponentFixture<MenwearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenwearComponent]
    });
    fixture = TestBed.createComponent(MenwearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
