import {
  Box,
  Chip,
  FormControl,
  InputLabel,
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
  Typography,
} from "@mui/material";
import { Transaction } from "../models/Transaction";
import { Account } from "../models/Account";
import { useCurrencies } from "../hooks/useCurrencies";
import { useEffect, useState } from "react";

interface TransactionsProps {
  transactions: Transaction[];
  selectedAccount: Account;
}

const Transactions = ({ transactions, selectedAccount }: TransactionsProps) => {
  const { getCurrencyById } = useCurrencies();

  const [transactionsData, setTransactionsData] = useState(transactions);
  const [menuView, setMenuView] = useState<string>("all");

  const getStatusColor = (status: string) => {
    return status === "success" ? "success" : "error";
  };

  const getAmountColor = (direction: string) => {
    return direction.toLowerCase() === "buy" ? "success.main" : "error.main";
  };

  const handleMenuSort = (status: string) => {
    const filteredTransactions =
      status === "all"
        ? transactions
        : transactions.filter((transaction) => transaction.status === status);

    setTransactionsData(filteredTransactions);
    setMenuView(status);
  };

  useEffect(() => {
    setTransactionsData(transactions);
    handleMenuSort("all");
  }, [transactions]);

  return (
    <Stack spacing={1}>
      <Typography variant="h6">Transactions</Typography>

      <FormControl sx={{ width: 150, mb: 2 }}>
        <InputLabel id="menu-view-label">Filter</InputLabel>
        <Select
          labelId="menu-view-label"
          value={menuView}
          label="Filter"
          onChange={(e) => handleMenuSort(e.target.value)}
          sx={{
            color: "white",
            "& .MuiSelect-icon": {
              color: "white",
            },
          }}
        >
          <MenuItem value="all">View All</MenuItem>
          <MenuItem value="success">Success</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
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
            {transactionsData.map((transaction, index) => {
              const currency = getCurrencyById(transaction.currency_id);
              return (
                <TableRow key={transaction.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.status}
                      color={getStatusColor(transaction.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {currency?.logo && (
                        <Box
                          sx={{
                            bgcolor: "white",
                            p: 0.5,
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={currency.logo}
                            alt={currency.name}
                            style={{ height: 16, width: 16 }}
                          />
                        </Box>
                      )}
                      <Typography variant="body2">{currency?.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ color: getAmountColor(transaction.direction) }}
                    >
                      {transaction.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {selectedAccount.currency === "USD"
                        ? transaction.amount_usd
                        : transaction.amount_aud}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Transactions;
