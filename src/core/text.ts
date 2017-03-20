import { Iterator } from './iterator';

export enum CharCategory {
    Word,
    Punctuation,
    Whitespace
}

export const isAlphaNum     = (c: string) => /^[a-z0-9]+$/i.test(c);
export const isWord         = (c: string) => c == '_' || isAlphaNum(c);
export const isWhitespace   = (c: string) => c === ' ' || c === '\t';
export const isPunctuation  = (c: string) => !(isWord(c) || isWhitespace(c));

export const categorizeChar = (c: string) =>
    isWord(c)       ? CharCategory.Word :
    isWhitespace(c) ? CharCategory.Whitespace :
                      CharCategory.Punctuation

export const isOnBoundary = (iterator: Iterator) =>
    iterator.current().map(categorizeChar).equals(iterator.next().map(categorizeChar));
