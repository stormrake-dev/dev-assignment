export interface Balance {
    [coin: string]: {
        pending: number;
        success: number;
    };
}


export interface BalancesProps {
  balances: Balance;
}