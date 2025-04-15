import {
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  SelectChangeEvent,
  InputLabel,
  FormControl
} from "@mui/material";
import { Transaction } from "../models/Transaction";
import { Account } from "../models/Account";
import { useCurrencies } from "../hooks/useCurrencies";
import TransactionsList  from "./TransactionsList"

interface TransactionsProps {
  transactions: Transaction[];
  selectedAccount: Account;
  filteredTransactions: Transaction[];
  setFilterTransactions: (filterTransaction :  Transaction[]) => void;
}

const Transactions = ({ transactions, selectedAccount, filteredTransactions, setFilterTransactions }: TransactionsProps) => {
  const { getCurrencyById } = useCurrencies();

  const getStatusColor = (status: string) => {
    return status === 'success' ? 'success' : 'error';
  };

  const getAmountColor = (direction: string) => {
    return direction.toLowerCase() === 'buy' ? 'success.main' : 'error.main';
  };

  const handleFilter = (event: SelectChangeEvent<string>) => {
      const filters = transactions.filter((transaction) => {
        return transaction.status === event.target.value;
      });
      setFilterTransactions(filters);
  }

  return (
    <Stack spacing={1}>
      <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="filter-select-label">Select Status</InputLabel>
          <Select
            labelId="filter-select-label"
            id="filter-select"
            onChange={handleFilter}
            label="Select Status"
          >
              <MenuItem value='pending'> Pending </MenuItem>
              <MenuItem value='success'> Success </MenuItem>
              <MenuItem value='failed'> Failed </MenuItem>
          </Select>
      </FormControl>
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Amount ({selectedAccount?.currency})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              <TransactionsList transactions={filteredTransactions} getStatusColor={getStatusColor} getAmountColor={getAmountColor} getCurrencyById={getCurrencyById} selectedAccount={selectedAccount}/>
            ) : (
              <TransactionsList transactions={transactions} getStatusColor={getStatusColor} getAmountColor={getAmountColor} getCurrencyById={getCurrencyById} selectedAccount={selectedAccount}/>
            )}

          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default Transactions;
