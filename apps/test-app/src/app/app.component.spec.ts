import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';

import { phl } from '@angular-extensions/pretty-html-log';
import { By } from '@angular/platform-browser';

const sleep = async (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule.forRoot()],
    }).compileComponents();
  });

  it('finds the input inside the ion-searchbar', async () => {
    const fixture = TestBed.createComponent(AppComponent);

    // sleep is necessary to make sure the dom is hydrated by Ionic.
    // I've not found another way to do this.
    await sleep(100);

    // Show the status of the HTML. This skips shadow dom elements,
    // but they are not important in this scenario
    // Notice there is an input element inside the ion-searchbar
    phl(fixture);

    // the searchbar itself can be found
    expect(fixture.debugElement.query(By.css('ion-searchbar'))).not.toBeNull();

    // the input that was created by ionic inside the searchbar is not accessible,
    // even though phl was able to print it
    expect(fixture.debugElement.query(By.css('input'))).not.toBeNull();
  });
});
