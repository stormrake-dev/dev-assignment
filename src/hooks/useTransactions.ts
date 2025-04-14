import { useState, useEffect } from 'react';
import { Transaction } from '../models/Transaction';
import transactionsData from '../data/transactions.json';

interface TransactionsData {
  transactions: Transaction[];
}

export const useTransactions = (accountId: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Filter transactions by account ID
      const accountTransactions = (transactionsData as TransactionsData).transactions.filter(
        (transaction: Transaction) => transaction.account_id === accountId
      );
      
      // Sort transactions by date in descending order (newest first)
      const sortedTransactions = accountTransactions.sort((a: Transaction, b: Transaction) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setTransactions(sortedTransactions);
      setLoading(false);
    } catch {
      setError('Failed to fetch transactions');
      setLoading(false);
    }
  }, [accountId]);

  return { transactions, loading, error };
};
