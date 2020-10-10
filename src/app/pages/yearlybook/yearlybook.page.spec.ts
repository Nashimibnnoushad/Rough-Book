import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YearlybookPage } from './yearlybook.page';

describe('YearlybookPage', () => {
  let component: YearlybookPage;
  let fixture: ComponentFixture<YearlybookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlybookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YearlybookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
