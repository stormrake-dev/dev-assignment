import { useState, useEffect } from 'react';
import { Account } from '../models/Account';
import accountsData from '../data/accounts.json';

const STORAGE_KEY = 'selected_account_id';

export const useAccounts = () => {
  const [accounts] = useState<Account[]>(accountsData.accounts);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(() => {
    // Initialize from localStorage
    const storedId = localStorage.getItem(STORAGE_KEY);
    return storedId || (accounts.length > 0 ? accounts[0].id : null);
  });

  // Update localStorage when selected account changes
  useEffect(() => {
    if (selectedAccountId) {
      localStorage.setItem(STORAGE_KEY, selectedAccountId);
    }
  }, [selectedAccountId]);

  const selectedAccount = accounts.find(account => account.id === selectedAccountId) || null;

  // If the selected account is not found, set the first account as the selected account
  useEffect(() => {
    if (!selectedAccount) {
      setSelectedAccountId(accounts[0].id);
    }
  }, [accounts, selectedAccount]);

  return {
    accounts,
    selectedAccount: selectedAccount || accounts[0], 
    selectedAccountId,
    setSelectedAccountId,
  };
};
