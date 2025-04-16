import { useState, useEffect } from "react";
import transactionsData from "../data/transactions.json";
import { Transaction } from "../models/Transaction";
import { Balance } from "../models/Balance";

export const useBalances = (accountId: string) => {
  const [balances, setBalances] = useState<Balance>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const { transactions } = transactionsData as {
        transactions: Transaction[];
      };

      const accountBalances: Balance = {};

      for (const tx of transactions) {
        //find the all the transactions for one account id
        if (tx.account_id !== accountId) continue;
        if (tx.status !== "success" && tx.status !== "pending") continue;

        const { currency_id, amount, status } = tx;

        if (!accountBalances[currency_id]) {
          accountBalances[currency_id] = { available: 0, frozen: 0 };
        }
        //accumulating success and pending for each currency
        if (status === "success") {
          accountBalances[currency_id].available += amount;
        } else if (status === "pending") {
          accountBalances[currency_id].frozen += amount;
        }
      }

      setBalances(accountBalances);
    } catch {
      setError("Failed to calculate the balance");
      setLoading(false);
    }
  }, [accountId]);

  return { balances, loading, error };
};
