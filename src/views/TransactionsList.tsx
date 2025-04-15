import { Box, Chip, TableCell, TableRow, Typography } from "@mui/material";
import { TransactionListProps } from "../models/Transaction";

const TransactionsList = ({ transactions, getStatusColor, getAmountColor, getCurrencyById, selectedAccount } :  TransactionListProps) => {


    return (
        <>
            {transactions.map((transaction, index) => {
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
                        color={getStatusColor(transaction.status) ? 'success' : 'error'}
                        size="small"
                    />
                    </TableCell>
                    <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {currency?.logo && (
                        <Box sx={{
                            bgcolor: 'white',
                            p: 0.5,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img src={currency.logo} alt={currency.name} style={{ height: 16, width: 16 }} />
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
                        {selectedAccount.currency === 'USD' ? transaction.amount_usd : transaction.amount_aud}
                    </Typography>
                    </TableCell>
                </TableRow>
                );
            })}
        </>
    )

}

export default TransactionsList;