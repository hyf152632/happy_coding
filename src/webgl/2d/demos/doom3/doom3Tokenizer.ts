export enum ETokenType {
  NONE,
  STRING,
  NUMBER,
}

export interface IDoom3Token {
  readonly type: ETokenType;
  isString: (str: string) => boolean;
  reset(): void;
  getString(): string;
  getFloat(): number;
  getInt(): number;
}

class Dom3Token implements IDoom3Token {
  private _type: ETokenType = ETokenType.NONE;
  private _string: string = "";
  private _float: number = 0;
  private _int: number = 0;

  public reset(): void {
    this._type = ETokenType.NONE;
    this._string = "";
    this._float = 0;
    this._int = 0;
  }

  public getString(): string {
    return this._string;
  }

  public getFloat(): number {
    return this._float;
  }

  public getInt(): number {
    return this._int;
  }

  public isString(str: string): boolean {
    return this._type === ETokenType.STRING && this._string === str;
  }

  public readonly type: ETokenType = ETokenType.NONE;
}

export class IDoom3Tokenizer {
  private _source = "";
  private _currIdx = 0;
  private parsedRet = [];
  createDoom3Token() {
    return {} as IDoom3Token;
  }
  setSource(source: string): void {
    this._source = source;
  }
  getNextToken(token): boolean {
    token = {} as IDoom3Token;
    return true;
  }
  reset(): void {
    this._currIdx = 0;
  }
}

export class Doom3Factory {
  static createDoom3Tokenizer(): IDoom3Tokenizer {
    return new IDoom3Tokenizer();
  }
}
