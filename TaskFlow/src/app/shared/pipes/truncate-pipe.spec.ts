import { TruncatePipe } from './truncate-pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null, undefined or empty value', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('should return unchanged text if length is <= limit', () => {
    const text = 'Texte court';
    expect(pipe.transform(text, 50)).toBe(text);
    expect(pipe.transform(text, 20)).toBe(text);
  });

  it('should truncate text longer than limit with default suffix "…"', () => {
    const longText = 'Un texte très long qui dépasse la limite par défaut de cinquante caractères.';
    const result = pipe.transform(longText);
    expect(result.endsWith('…')).toBe(true);
    expect(result.length).toBeLessThanOrEqual(51); // 50 chars + 1 ellipsis
  });

  it('should truncate with custom limit and custom suffix', () => {
    const text = 'Bonjour le monde entier';
    expect(pipe.transform(text, 10, '...')).toBe('Bonjour le...');
  });

  it('should trim trailing spaces before adding the suffix', () => {
    // "Bonjour tout le monde" -> slice(0, 8) is "Bonjour "
    const text = 'Bonjour tout le monde';
    expect(pipe.transform(text, 8, '…')).toBe('Bonjour…');
  });
});
