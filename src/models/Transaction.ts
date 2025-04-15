import { Account } from './Account';

export interface TransactionsData {
  transactions: Transaction[];
}

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

export type TransactionListProps = {
  transactions: Transaction[];
  getStatusColor: (status: string) => string;
  getAmountColor: (direction: string) => string;
  getCurrencyById: (currencyId: string) => { logo: string; name: string } | undefined;
  selectedAccount: Account;
};

