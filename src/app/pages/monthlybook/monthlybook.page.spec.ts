import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonthlybookPage } from './monthlybook.page';

describe('MonthlybookPage', () => {
  let component: MonthlybookPage;
  let fixture: ComponentFixture<MonthlybookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlybookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlybookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
