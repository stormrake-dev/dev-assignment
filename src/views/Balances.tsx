import {
  Stack,
  Typography
} from "@mui/material";
import { Account } from "../models/Account";
import { useCurrencies } from "../hooks/useCurrencies";

interface BalancesProps {
  selectedAccount: Account;
}

const Balances = ({ selectedAccount }: BalancesProps) => {
  const { getCurrencyById } = useCurrencies();

  const getAmountColor = (frozen: boolean) => {
    return frozen ? 'warning.main' : 'primary.main';
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h6">Balances</Typography>
    </Stack>
  );
}

export default Balances;
