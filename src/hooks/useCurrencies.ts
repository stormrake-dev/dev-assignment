import { Currency } from '../models/Currency';
import currenciesData from '../data/currencies.json';

export const useCurrencies = () => {
  const getCurrencyById = (id: string): Currency | undefined => {
    return currenciesData.currencies.find(currency => currency.id === id);
  };

  const getAllCurrencies = (): Currency[] => {
    return currenciesData.currencies;
  };

  const getActiveCurrencies = (): Currency[] => {
    return currenciesData.currencies.filter(currency => currency.active);
  };

  return {
    getCurrencyById,
    getAllCurrencies,
    getActiveCurrencies
  };
};
