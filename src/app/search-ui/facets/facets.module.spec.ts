import { FacetsModule } from './facets.module';

describe('FacetsModule', () => {
  let facetsModule: FacetsModule;

  beforeEach(() => {
    facetsModule = new FacetsModule();
  });

  it('should create an instance', () => {
    expect(facetsModule).toBeTruthy();
  });
});
