import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DaybookPage } from './daybook.page';

describe('DaybookPage', () => {
  let component: DaybookPage;
  let fixture: ComponentFixture<DaybookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaybookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DaybookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
