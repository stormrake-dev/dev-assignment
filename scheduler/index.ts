interface Period {
  start: {
    hour: number;
    minute: number;
  };
  end: {
    hour: number;
    minute: number;
  };
}

class Scheduler {
  /**
   * Adds a new user with their busy periods.
   */
  addUser(userId: string, busyPeriods: Period[]) {
    // TODO: Implement this method.
  }

  /**
   * Updates the current user's information with their free periods, which
   * should replace their current busy periods if colliding.
   */
  freeUser(userId: string, freePeriods: Period[]) {
    // TODO: Implement this method.
  }

  /**
   * Updates the current user's information with their busy periods, which
   * should replace their current free periods if colliding.
   */
  occupyUser(userId: string, busyPeriods: Period[]) {
    // TODO: Implement this method.
  }

  /**
   * Removes a user from the scheduler.
   */
  removeUser(userId: string) {
    // TODO: Implement this method.
  }

  /**
   * Returns a **sorted** list of consecutive free periods for everyone.
   * 
   * Note that the edges of each period are not counted. For example, if John
   * is busy from 10:00 to 11:00, his free periods can end at 10:00 or start
   * from 11:00.
   * 
   * The day starts at 00:00 and ends at 23:59.
   */
  getFreePeriodsOfEveryone(): Period[] {
    // TODO: Implement this method.
  }
}

export default Scheduler;
