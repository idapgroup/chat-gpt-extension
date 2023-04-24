export const distinctUntilKeysChanged = (prev: any, curr: any): boolean => prev && curr ? JSON.stringify(prev) === JSON.stringify(curr): false;
