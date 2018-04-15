import { AlgoliaModule } from './algolia.module';

describe('AlgoliaModule', () => {
  let algoliaModule: AlgoliaModule;

  beforeEach(() => {
    algoliaModule = new AlgoliaModule();
  });

  it('should create an instance', () => {
    expect(algoliaModule).toBeTruthy();
  });
});
