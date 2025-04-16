export interface CurrencyBalance {
  available: number;
  frozen: number;
}

export interface Balance {
  [currency: string]: CurrencyBalance;
}
