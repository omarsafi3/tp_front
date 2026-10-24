import { InitialsPipe } from './initials-pipe';

describe('InitialsPipe', () => {
  let pipe: InitialsPipe;

  beforeEach(() => {
    pipe = new InitialsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "?" for null, undefined or empty string', () => {
    expect(pipe.transform(null)).toBe('?');
    expect(pipe.transform(undefined)).toBe('?');
    expect(pipe.transform('')).toBe('?');
    expect(pipe.transform('   ')).toBe('?');
  });

  it('should return uppercase initial for single word name', () => {
    expect(pipe.transform('karim')).toBe('K');
    expect(pipe.transform('Sarra')).toBe('S');
  });

  it('should return initials of first two words in uppercase', () => {
    expect(pipe.transform('Amira Ben Salah')).toBe('AB');
    expect(pipe.transform('youssef mansour')).toBe('YM');
    expect(pipe.transform('  amira   ben  salah ')).toBe('AB');
  });
});
