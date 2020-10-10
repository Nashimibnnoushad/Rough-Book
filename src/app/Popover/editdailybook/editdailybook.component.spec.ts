import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditdailybookComponent } from './editdailybook.component';

describe('EditdailybookComponent', () => {
  let component: EditdailybookComponent;
  let fixture: ComponentFixture<EditdailybookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdailybookComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditdailybookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
