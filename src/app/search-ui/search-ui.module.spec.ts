import { SearchUiModule } from './search-ui.module';

describe('SearchUiModule', () => {
  let searchUiModule: SearchUiModule;

  beforeEach(() => {
    searchUiModule = new SearchUiModule();
  });

  it('should create an instance', () => {
    expect(searchUiModule).toBeTruthy();
  });
});
