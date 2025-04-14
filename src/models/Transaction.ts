export interface Transaction {
  id: string;
  date: string;
  direction: 'buy' | 'sell';
  currency_id: string;
  amount: number;
  amount_aud: number;
  amount_usd: number;
  account_id: string;
  status: 'pending' | 'success' | 'failed';
}
