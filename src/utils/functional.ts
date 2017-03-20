
export const flatten = <T>(arr: T[][]): T[] => arr.reduce((a, b) => a.concat(b), []);