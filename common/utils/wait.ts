/**
 * Helper function resolving after a set amount of milliseconds.
 *
 * @param ms time to wait before resolving
 */
export const wait = (ms = 0): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))
