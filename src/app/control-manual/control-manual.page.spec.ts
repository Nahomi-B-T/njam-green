import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlManualPage } from './control-manual.page';

describe('ControlManualPage', () => {
  let component: ControlManualPage;
  let fixture: ComponentFixture<ControlManualPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlManualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
