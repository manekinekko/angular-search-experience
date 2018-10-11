import { AppPage } from './app.po';
import {by, element} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show search input', () => {
    page.navigateTo();
    expect(element(by.id('mat-input-0')).getAttribute('placeholder')).toEqual('Search for popular apps...');
  });
});
