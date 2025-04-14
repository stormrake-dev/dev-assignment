import json
import random
from typing import List, Dict

def generate_id() -> str:
    return f"{random.randint(100000, 999999)}"

def generate_name() -> str:
    first_names = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth"]
    last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]
    return f"{random.choice(first_names)} {random.choice(last_names)}"

def generate_email(name: str) -> str:
    domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]
    email_name = name.lower().replace(" ", ".")
    return f"{email_name}@{random.choice(domains)}"

def generate_phone() -> str:
    area_code = random.randint(200, 999)
    prefix = random.randint(200, 999)
    line = random.randint(1000, 9999)
    return f"{area_code}-{prefix}-{line}"

def generate_currency() -> str:
    return random.choice(["AUD", "USD"])

def generate_accounts(num_accounts: int) -> List[Dict]:
    accounts = []
    for _ in range(num_accounts):
        name = generate_name()
        account = {
            "id": generate_id(),
            "name": name,
            "email": generate_email(name),
            "phone": generate_phone(),
            "currency": generate_currency()
        }
        accounts.append(account)
    return accounts

def main():
    accounts = generate_accounts(10)
    with open("src/data/accounts.json", "w") as f:
        json.dump({"accounts": accounts}, f, indent=2)

if __name__ == "__main__":
    main()
