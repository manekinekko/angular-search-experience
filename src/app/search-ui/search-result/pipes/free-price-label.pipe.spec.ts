import { SanitizeCurrencyPipe } from './sanitize-currency.pipe';

describe('SanitizeCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
