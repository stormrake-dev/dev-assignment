// TODO: Implement useBalances hook
import { useState, useCallback } from 'react';
import { Balance } from '../models/Balance';
// import { fetchBalances } from '../services/Balances';
import { Transaction } from '../models/Transaction';

export const useBalances = ( transactions : Transaction[]) => {
    const [balances, setBalances] = useState<Balance>({});

    const getBalances = useCallback(() => {
        const fetchBalancesData = async () => {
            const transactionsPerCoin = {} as Balance;
            transactions.forEach((transaction: Transaction) => {
                if(!transaction.status || transaction.status === 'failed') return;
            
                if(!transactionsPerCoin[transaction.currency_id] &&  transaction.status === 'pending') {
                    transactionsPerCoin[transaction.currency_id] = {
                        pending: 0,
                        success: 0,
                    };
                    transactionsPerCoin[transaction.currency_id].pending += transaction.amount;
                }
                if(!transactionsPerCoin[transaction.currency_id] &&  transaction.status === 'success') {
                    transactionsPerCoin[transaction.currency_id] = {
                        pending: 0,
                        success: 0,
                    };
                    transactionsPerCoin[transaction.currency_id].success += transaction.amount;
                }
            });
            setBalances(transactionsPerCoin);
        };

        fetchBalancesData();
    }, [transactions]);

    return { balances, getBalances };
};
