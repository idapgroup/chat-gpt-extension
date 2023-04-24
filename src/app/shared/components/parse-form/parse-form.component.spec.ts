import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParseFormComponent} from './parse-form.component';

describe('ParseFormComponent', () => {
  let component: ParseFormComponent;
  let fixture: ComponentFixture<ParseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ParseFormComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ParseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
