import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Account } from "../models/Account";
import { useCurrencies } from "../hooks/useCurrencies";
import { Balance } from "../models/Balance";

interface BalancesProps {
  balances: Balance;
  selectedAccount: Account;
}

const Balances = ({ balances, selectedAccount }: BalancesProps) => {
  const { getCurrencyById } = useCurrencies();

  return (
    <Stack spacing={1}>
      <Typography variant="h6">Balances</Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Frozen</TableCell>
              <TableCell>Total Amount ({selectedAccount?.currency})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(balances).map(([currencyId, balance], index) => {
              const currency = getCurrencyById(currencyId);

              return (
                <TableRow key={currencyId}>
                  <TableCell>{index + 1}</TableCell>
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
                    <Typography variant="body2" color="primary">
                      {balance.available.toFixed(4)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="warning.main">
                      {balance.frozen.toFixed(4)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {(balance.available + balance.frozen).toFixed(4)}
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

export default Balances;
