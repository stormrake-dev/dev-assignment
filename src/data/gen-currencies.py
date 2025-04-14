import json
from typing import List, Dict

def generate_currencies() -> List[Dict]:
    currencies = [
        {
            "id": "ada",
            "name": "Cardano",
            "description": "Cardano is a proof-of-stake blockchain platform founded on peer-reviewed research",
            "active": False,
            "logo": "/logos/ada.svg"
        },
        {
            "id": "btc", 
            "name": "Bitcoin",
            "description": "Bitcoin is the first and most well-known cryptocurrency, created in 2009",
            "active": True,
            "logo": "/logos/btc.svg"
        },
        {
            "id": "eth",
            "name": "Ethereum",
            "description": "Ethereum is a decentralized platform that enables smart contracts and dApps",
            "active": True,
            "logo": "/logos/eth.svg"
        },
        {
            "id": "ltc",
            "name": "Litecoin", 
            "description": "Litecoin is a peer-to-peer cryptocurrency created as a fork of Bitcoin",
            "active": False,
            "logo": "/logos/ltc.svg"
        },
        {
            "id": "trx",
            "name": "TRON",
            "description": "TRON is a blockchain platform focused on entertainment and content sharing",
            "active": True,
            "logo": "/logos/trx.svg"
        },
        {
            "id": "usdt",
            "name": "Tether",
            "description": "Tether is a stablecoin pegged to the US Dollar",
            "active": True,
            "logo": "/logos/usdt.svg"
        },
        {
            "id": "xrp",
            "name": "XRP",
            "description": "XRP is a digital asset built for payments on the XRP Ledger",
            "active": True,
            "logo": "/logos/xrp.svg"
        }
    ]
    return currencies

def main():
    currencies = generate_currencies()
    with open("src/data/currencies.json", "w") as f:
        json.dump({"currencies": currencies}, f, indent=2)

if __name__ == "__main__":
    main()
