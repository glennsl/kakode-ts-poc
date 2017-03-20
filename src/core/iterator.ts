import { TextDocument, Position } from 'vscode';
import { Option, some, none } from '../utils/option';
import { isWhitespace } from '../core/text';

export interface Iterator {
    pos(): Position,
    line(): string,
    current(): Option<string>,
    prev(): Option<string>,
    next(): Option<string>,
    isEol(): boolean,
    isEof(): boolean,
    isBol(): boolean,
    isBof(): boolean,
    advance(): Option<Position>,
    advanceWhile(predicate: (s: string) => boolean): Option<Position>
    retreat(): Option<Position>,
    retreatWhile(predicate: (s: string) => boolean): Option<Position>
}

export function DocumentIterator(document: TextDocument, initialPosition = new Position(0, 0)): Iterator {

    let pos = initialPosition;

    const self = {
        pos() {
            return pos;
        },

        line(): string {
            // unsafe? 
            return document.lineAt(pos).text;
        },

        current(): Option<string> {
            const c = self.line()[pos.character];
            return c ? some(c) : none<string>();
        },

        prev(): Option<string> {
            const c = self.line()[pos.character - 1];
            return c ? some(c) : none<string>();
        },

        next(): Option<string> {
            const c = self.line()[pos.character + 1];
            return c ? some(c) : none<string>();
        },

        isEol(): boolean {
            return pos.character >= self.line().length;
        },

        isEof(): boolean {
            return pos.line > document.lineCount || (pos.line === document.lineCount && self.isEol())
        },

        isBol(): boolean {
            return pos.character <= 0;
        },

        isBof(): boolean {
            return pos.line <= 0 && pos.character <= 0;
        },

        advance(): Option<Position> {
            if (self.isEof())
                return none<Position>();
            else if (self.isEol())
                return some(pos = pos.translate(1, 0));
            else
                return some(pos = pos.translate(0, 1));
        },

        advanceWhile(predicate: (s: string) => boolean): Option<Position> {
            while (!self.isEof() && self.current().map(predicate).isSome())
                if (self.advance().isNone())
                    return none<Position>();
            return some(pos);
        },

        retreat(): Option<Position> {
            if (self.isBof())
                return none<Position>();
            else if (self.isBol())
                return some(pos = pos.translate(-1, 0));
            else
                return some(pos = pos.translate(0, -1));
        },

        retreatWhile(predicate: (s: string) => boolean): Option<Position> {
            while (!self.isBof() && self.current().map(predicate).isSome())
                if (self.retreat().isNone())
                    return none<Position>();
            return some(pos);
        },
    };

    return self;
};