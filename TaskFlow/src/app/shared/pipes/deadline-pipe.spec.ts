import { DeadlinePipe } from './deadline-pipe';

describe('DeadlinePipe', () => {
  let pipe: DeadlinePipe;
  const fixedToday = new Date(2026, 9, 7); // 7 Octobre 2026

  beforeEach(() => {
    pipe = new DeadlinePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Pas d’échéance" when value is null, undefined, empty or invalid', () => {
    expect(pipe.transform(null)).toBe('Pas d’échéance');
    expect(pipe.transform(undefined)).toBe('Pas d’échéance');
    expect(pipe.transform('')).toBe('Pas d’échéance');
    expect(pipe.transform('invalid-date')).toBe('Pas d’échéance');
  });

  it('should return "Aujourd’hui" for today date', () => {
    expect(pipe.transform('2026-10-07', fixedToday)).toBe('Aujourd’hui');
  });

  it('should return "Demain" for tomorrow date', () => {
    expect(pipe.transform('2026-10-08', fixedToday)).toBe('Demain');
  });

  it('should return "Dans n jours" for future dates', () => {
    expect(pipe.transform('2026-10-12', fixedToday)).toBe('Dans 5 jours');
    expect(pipe.transform('2026-10-25', fixedToday)).toBe('Dans 18 jours');
  });

  it('should return "En retard de 1 jour" for yesterday (singular)', () => {
    expect(pipe.transform('2026-10-06', fixedToday)).toBe('En retard de 1 jour');
  });

  it('should return "En retard de n jours" for past dates > 1 day (plural)', () => {
    // 02/10/2026 relative to 07/10/2026 is 5 days ago (exact TP example!)
    expect(pipe.transform('2026-10-02', fixedToday)).toBe('En retard de 5 jours');
    expect(pipe.transform('2026-09-10', fixedToday)).toBe('En retard de 27 jours');
  });
});
