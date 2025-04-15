import { describe, it, expect } from '@jest/globals';
import Scheduler from './';

const period = (startHour: number, startMinute: number, endHour: number, endMinute: number) => ({
  start: {
    hour: startHour,
    minute: startMinute,
  },
  end: {
    hour: endHour,
    minute: endMinute,
  },
})

describe('Scheduler', () => {
  const scheduler = new Scheduler();

  it('should add John as a user with his busy periods', () => {
    scheduler.addUser('john', [
      period(10, 0, 11, 0), // John is busy from 10:00 to 11:00
      period(13, 0, 14, 0), // John is busy from 13:00 to 14:00
    ]);

    expect(scheduler.getFreePeriodsOfEveryone()).toMatchObject([
      period(0,  0, 10, 0),  // 0:00 - 10:00
      period(11, 0, 13, 0),  // 11:00 - 13:00
      period(14, 0, 23, 59), // 14:00 - 23:59
    ]);
  });

  it('should add Jane as a user with her busy periods', () => {
    scheduler.addUser('jane', [
      period(10, 30, 12, 30), // Jane is busy from 10:30 to 12:30
    ]);

    expect(scheduler.getFreePeriodsOfEveryone()).toMatchObject([
      period(0,  0,  10, 0),  // 0:00 - 10:00
      period(12, 30, 13, 0),  // 12:30 - 13:00
      period(14, 0,  23, 59), // 14:00 - 23:59
    ]);
  });

  it('should free John from his busy periods', () => {
    scheduler.freeUser('john', [
      period(10, 0, 10, 30), // John is now free from 10:00 to 10:30
    ]);

    expect(scheduler.getFreePeriodsOfEveryone()).toMatchObject([
      period(0,  0,  10, 30), // 0:00 - 10:30
      period(12, 30, 13, 0),  // 12:30 - 13:00
      period(14, 0,  23, 59), // 14:00 - 23:59
    ]);
  });

  it('should occupy Jane in a new period', () => {
    scheduler.occupyUser('jane', [
      period(12, 30, 13, 0), // Jane is now busy from 12:30 to 13:00
    ]);

    expect(scheduler.getFreePeriodsOfEveryone()).toMatchObject([
      period(0,  0, 10, 30), // 0:00 - 10:30
      period(14, 0, 23, 59), // 14:00 - 23:59
    ]);
  });
  
  it('should add Kate as a user with her busy periods', () => {
    scheduler.addUser('kate', [
      period(14, 0, 15, 0), // Kate is busy from 14:00 to 15:00
    ]);

    expect(scheduler.getFreePeriodsOfEveryone()).toMatchObject([
      period(0,  0, 10, 30), // 0:00 - 10:30
      period(15, 0, 23, 59), // 15:00 - 23:59
    ]);
  });

  it('should remove Jane from the scheduler', () => {
    scheduler.removeUser('jane');

    expect(scheduler.getFreePeriodsOfEveryone()).toMatchObject([
      period(0,  0, 10, 30), // 0:00 - 10:30
      period(11, 0, 13, 0),  // 11:00 - 13:00
      period(15, 0, 23, 59), // 15:00 - 23:59
    ]);
  });
});
