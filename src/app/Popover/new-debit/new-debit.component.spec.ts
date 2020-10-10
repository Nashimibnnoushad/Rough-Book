import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewDebitComponent } from './new-debit.component';

describe('NewDebitComponent', () => {
  let component: NewDebitComponent;
  let fixture: ComponentFixture<NewDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDebitComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
