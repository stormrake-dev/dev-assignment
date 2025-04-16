import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Box,
  Chip,
  // Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";

import "./App.css";
import { useAccounts } from "./hooks/useAccounts";
import { useTransactions } from "./hooks/useTransactions";
import Balances from "./views/Balances";
import Transactions from "./views/Transactions";
import { useBalances } from "./hooks/useBalances";

function App() {
  const { accounts, selectedAccount, selectedAccountId, setSelectedAccountId } =
    useAccounts();
  const { transactions, loading, error } = useTransactions(
    selectedAccountId || ""
  );
  const { balances } = useBalances(selectedAccountId || "");

  const [selectedView, setSelectedView] = useState<"transactions" | "balances">(
    "transactions"
  );

  const getChipVariant = (view: string) => {
    return selectedView === view ? "filled" : "outlined";
  };

  return (
    <Box className="m-auto w-full lg:w-[800px] xl:w-[1000px]" sx={{ p: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="account-select-label">Select Account</InputLabel>
        <Select
          labelId="account-select-label"
          id="account-select"
          value={selectedAccountId || ""}
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
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
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
          variant={getChipVariant("transactions")}
          onClick={() => {
            setSelectedView("transactions");
          }}
          sx={{ cursor: "pointer" }}
        />
        <Chip
          label="Balances"
          color="primary"
          variant={getChipVariant("balances")}
          onClick={() => {
            setSelectedView("balances");
          }}
          sx={{ cursor: "pointer" }}
        />
      </Stack>

      {!loading &&
        !error &&
        (selectedView === "transactions" ? (
          <Transactions
            transactions={transactions}
            selectedAccount={selectedAccount}
          />
        ) : (
          <Balances balances={balances} selectedAccount={selectedAccount} />
        ))}
    </Box>
  );
}

export default App;
