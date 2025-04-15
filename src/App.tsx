import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Box,
  Chip,
  Typography,
  Stack,
} from '@mui/material'
import { useState } from 'react'

import './App.css'
import { useAccounts } from './hooks/useAccounts'
import { useTransactions } from './hooks/useTransactions'
import Balances from './views/Balances'
import Transactions from './views/Transactions'

function App() {
  const { accounts, selectedAccount, selectedAccountId, setSelectedAccountId } = useAccounts();
  const { transactions, loading, error } = useTransactions(selectedAccountId || '');
  const [selectedView] = useState<'transactions' | 'balances'>('transactions');

  return (
    <Box className="m-auto w-full lg:w-[800px] xl:w-[1000px]" sx={{ p: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="account-select-label">Select Account</InputLabel>
        <Select
          labelId="account-select-label"
          id="account-select"
          value={selectedAccountId || ''}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          label="Select Account"
        >
          {accounts.map((account) => (
            <MenuItem key={account.id} value={account.id}>
              {account.id} - {account.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip
          label="Transactions"
          color="primary"
          variant="filled"
          onClick={() => {}}
          sx={{ cursor: 'pointer' }}
        />
        <Typography > 
          Balances
        </Typography>
      </Stack>
      
      {!loading && !error && (
        selectedView === 'transactions' ? (
          <Transactions transactions={transactions} selectedAccount={selectedAccount} />
        ) : (
          <Balances selectedAccount={selectedAccount} />
        )
      )}
    </Box>
  )
}

export default App
