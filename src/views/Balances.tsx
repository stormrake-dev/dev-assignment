import {
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
import { useCurrencies } from "../hooks/useCurrencies";
import { BalancesProps } from "../models/Balance";



const Balances = ({ balances } : BalancesProps) => {
  const { getCurrencyById } = useCurrencies();

  return (
    <Stack spacing={1}>
       <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>Success</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Object.entries(balances).map(([coin, balance], index) => {
            const currency = getCurrencyById(coin) || { name: coin.toUpperCase(), logo: null };
            const pending = balance?.pending ?? 0; 
            const success = balance?.success ?? 0;
          
            return (
              <TableRow key={index}>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {currency?.logo && (
                      <img
                        src={currency.logo}
                        alt={currency.name}
                        style={{ height: 16, width: 16 }}
                      />
                    )}
                    {currency?.name ?? coin.toUpperCase()}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography style={{ color: 'red' }}>
                    {pending}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ color: 'green' }}>
                    {success}
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
}

export default Balances;
