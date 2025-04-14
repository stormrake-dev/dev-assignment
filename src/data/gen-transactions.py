import json
import random
from datetime import datetime, timedelta
import uuid
from collections import defaultdict

# Load accounts and currencies data
with open('src/data/accounts.json', 'r') as f:
    accounts_data = json.load(f)
    accounts = accounts_data['accounts']

with open('src/data/currencies.json', 'r') as f:
    currencies_data = json.load(f)
    currencies = currencies_data['currencies']

# Initialize balance tracking
# Format: balances[account_id][currency_id] = {'available': amount, 'frozen': amount}
balances = defaultdict(lambda: defaultdict(lambda: {'available': 0.0, 'frozen': 0.0}))

# Generate transactions
transactions = []
statuses = ['pending', 'failed', 'success']
directions = ['buy', 'sell']

# Historical exchange rates (simplified for demonstration)
def get_historical_rate(currency_id, date):
    base_rates = {
        'btc': 50000,  # USD
        'eth': 3000,
        'ada': 1.5,
        'ltc': 100,
        'trx': 0.1,
        'usdt': 1,
        'xrp': 0.5
    }
    return base_rates.get(currency_id, 1) * random.uniform(0.8, 1.2)

def get_aud_rate(currency_id, date):
    # Simulate AUD/USD rate variation
    aud_usd_rate = random.uniform(0.6, 0.8)  # AUD/USD rate between 0.6 and 0.8
    usd_rate = get_historical_rate(currency_id, date)
    return usd_rate * aud_usd_rate

def can_perform_transaction(account_id, currency_id, direction, amount):
    if direction == 'sell':
        return balances[account_id][currency_id]['available'] >= amount
    return True  # Buying is always allowed

def update_balance(account_id, currency_id, direction, amount, status):
    if status == 'failed':
        return  # Failed transactions don't affect balance
    
    if status == 'pending':
        if direction == 'buy':
            balances[account_id][currency_id]['frozen'] += amount
        else:  # sell
            balances[account_id][currency_id]['frozen'] += amount
            balances[account_id][currency_id]['available'] -= amount
    else:  # success
        if direction == 'buy':
            balances[account_id][currency_id]['available'] += amount
        else:  # sell
            balances[account_id][currency_id]['available'] -= amount

# Generate 1000 transactions
for _ in range(1000):
    # Random date within the last 2 years
    days_ago = random.randint(1, 730)
    date = datetime.now() - timedelta(days=days_ago)
    
    # Random transaction details
    currency = random.choice(currencies)
    account = random.choice(accounts)
    direction = random.choice(directions)
    status = random.choice(statuses)
    
    # Generate random amounts with BTC constraint
    if currency['id'] == 'btc':
        amount = round(random.uniform(0.001, 50), 8)  # BTC amount limited to 50 units
    else:
        amount = round(random.uniform(0.1, 1000), 8)  # Other currencies
    
    # Calculate AUD and USD amounts based on historical rates
    aud_rate = get_aud_rate(currency['id'], date)
    usd_rate = get_historical_rate(currency['id'], date)
    
    amount_aud = round(amount * aud_rate, 2)
    amount_usd = round(amount * usd_rate, 2)
    
    # If selling, ensure we have enough available balance
    max_sell_amount = balances[account['id']][currency['id']]['available']
    if direction == 'sell' and max_sell_amount < amount:
        # Revert the direction if not enough available balance
        direction = 'buy'
    
    transaction = {
        'id': str(uuid.uuid4()),
        'date': date.strftime('%Y-%m-%dT%H:%M:%SZ'),
        'direction': direction,
        'currency_id': currency['id'],
        'amount': amount,
        'amount_aud': amount_aud,
        'amount_usd': amount_usd,
        'account_id': account['id'],
        'status': status
    }
    
    # Update balance for transactions
    update_balance(account['id'], currency['id'], direction, amount, status)
    
    transactions.append(transaction)

# Save transactions to a file
with open('src/data/transactions.json', 'w') as f:
    json.dump({'transactions': transactions}, f, indent=2)

print(f"Generated {len(transactions)} transactions and saved to src/data/transactions.json")

# Save final balances to a file
with open('src/data/balances.json', 'w') as f:
    # Filter out zero balances and round to 8 decimal places for crypto amounts
    filtered_balances = {
        account_id: {
            currency_id: {
                'available': round(balance['available'], 8),
                'frozen': round(balance['frozen'], 8)
            }
            for currency_id, balance in currency_balances.items()
            if balance['available'] > 0 or balance['frozen'] > 0
        }
        for account_id, currency_balances in balances.items()
    }
    json.dump({'balances': filtered_balances}, f, indent=2)

print("Final balances saved to src/data/balances.json")
