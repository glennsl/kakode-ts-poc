// API ripped off from https://doc.rust-lang.org/std/option/enum.Option.html

export interface Option<T> {
    isSome(): boolean;
    isNone(): boolean;
    expect(msg: string): T;
    unwrap(): T;
    unwrap_or(default_: T): T;
    unwrap_or_else(f: () => T): T;
    map<U>(f: (v: T) => U): Option<U>;
    map_or<U>(default_: U, f: (v: T) => U): U;
    map_or_else<U>(d: () => U, f: (v: T) => U): U;
    and<U>(optb: Option<U>): Option<U>;
    and_then<U>(f: (v: T) => Option<U>): Option<U>;
    or(optb: Option<T>): Option<T>;
    or_else(f: () => Option<T>): Option<T>;
    equals(optb: Option<T>): boolean;
}

export class Some<T> implements Option<T> {
    private _value: T;

    constructor(value: T) {
        this._value = value;
    }

    isSome(): boolean {
        return true;
    }

    isNone(): boolean {
        return false;
    }

    expect(msg: string): T {
        return this._value;
    }

    unwrap(): T {
        return this._value;
    }

    unwrap_or(default_: T): T {
        return this._value;
    }

    unwrap_or_else(f: () => T): T {
        return this._value;
    }

    map<U>(f: (v: T) => U): Option<U> {
        return new Some(f(this._value));
    }

    map_or<U>(default_: U, f: (v: T) => U): U {
        return f(this._value);
    }

    map_or_else<U>(d: () => U, f: (v: T) => U): U {
        return f(this._value);
    }

    and<U>(optb: Option<U>): Option<U> {
        return optb;
    }

    and_then<U>(f: (v: T) => Option<U>): Option<U> {
        return f(this._value);
    }

    or(optb: Option<T>): Option<T> {
        return this;
    }

    or_else(f: () => Option<T>): Option<T> {
        return this;
    }

    equals(optb: Option<T>): boolean {
        return optb.map_or(false, b => this._value === b);
    }
}

export class None<T> implements Option<T> {
    expect(msg: string): T {
        throw new Error(msg);
    }

    isSome(): boolean {
        return false;
    }

    isNone(): boolean {
        return true;
    }

    unwrap(): T {
        throw new Error("called Option.unwrap() on a `None` value");
    }

    unwrap_or(default_: T): T {
        return default_;
    }

    unwrap_or_else(f: () => T): T {
        return f();
    }

    map<U>(f: (v: T) => U): Option<U> {
        return new None<U>();
    }

    map_or<U>(default_: U, f: (v: T) => U): U {
        return default_;
    }

    map_or_else<U>(d: () => U, f: (v: T) => U): U {
        return d();
    }

    and<U>(optb: Option<U>): Option<U> {
        return optb;
    }

    and_then<U>(f: (v: T) => Option<U>): Option<U> {
        return new None<U>();
    }

    or(optb: Option<T>): Option<T> {
        return optb;
    }

    or_else(f: () => Option<T>): Option<T> {
        return f();
    }

    equals(optb: Option<T>): boolean {
        return optb.isNone();
    }
}

export function some<T>(v: T): Some<T> {
    return new Some(v);
}

export function none<T>(): None<T> {
    return new None<T>();
}