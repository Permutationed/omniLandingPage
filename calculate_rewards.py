import csv
import json
import sys
from pathlib import Path

def load_card_rewards_matrix(matrix_path='public/card_rewards_matrix.csv'):
    """Load the card rewards matrix and return as a dictionary"""
    rewards_matrix = {}
    
    with open(matrix_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            card_name = row['Card Name']
            rewards_matrix[card_name] = {}
            for category, reward_rate in row.items():
                if category != 'Card Name':
                    try:
                        rewards_matrix[card_name][category] = float(reward_rate) if reward_rate else 0.0
                    except ValueError:
                        rewards_matrix[card_name][category] = 0.0
    
    return rewards_matrix

def map_category_to_matrix_category(category):
    """Map transaction category to card rewards matrix category"""
    category_lower = category.lower().strip()
    
    # Category mapping dictionary
    category_mapping = {
        # Restaurants
        'restaurant': 'Restaurants (U.S.)',
        'dining': 'Restaurants (U.S.)',
        'food & drink': 'Restaurants (U.S.)',
        'fast food': 'Fast Food',
        'coffee': 'Restaurants (U.S.)',
        'cafe': 'Restaurants (U.S.)',
        
        # Grocery
        'grocery': 'Grocery stores (U.S.)',
        'supermarket': 'Grocery stores (U.S.)',
        'grocery store': 'Grocery stores (U.S.)',
        'target': 'Target',
        'walmart': 'Grocery stores (U.S.)',
        'whole foods': 'Whole Foods',
        'costco': 'Wholesale Club',
        
        # Gas
        'gas': 'Gas stations (U.S.)',
        'gas station': 'Gas stations (U.S.)',
        'fuel': 'Gas stations (U.S.)',
        'exxon': 'Gas stations (U.S.)',
        'shell': 'Gas stations (U.S.)',
        'chevron': 'Gas stations (U.S.)',
        
        # Travel
        'airline': 'Airlines',
        'air travel': 'Airlines',
        'hotel': 'Hotel',
        'car rental': 'Car Rental',
        'travel': 'Travel',
        'uber': 'Ride-Sharing',
        'lyft': 'Ride-Sharing',
        
        # Shopping
        'amazon': 'Amazon',
        'target': 'Target',
        'home depot': 'Home Improvement',
        'lowes': 'Home Improvement',
        'walmart': 'Grocery stores (U.S.)',
        'department store': 'Department Stores',
        
        # Entertainment
        'entertainment': 'Entertainment',
        'streaming': 'Streaming services',
        'netflix': 'Streaming services',
        'spotify': 'Streaming services',
        
        # Other
        'pharmacy': 'Drugstore',
        'drugstore': 'Drugstore',
        'cvs': 'Drugstore',
        'walgreens': 'Drugstore',
        'starbucks': 'Starbucks',
        
        # Default fallback
        'other': 'Other purchases',
        'general': 'Other purchases',
    }
    
    # Direct match
    if category_lower in category_mapping:
        return category_mapping[category_lower]
    
    # Partial match
    for key, value in category_mapping.items():
        if key in category_lower:
            return value
    
    # Default to "Other purchases" if no match
    return 'Other purchases'

def parse_transaction_csv(csv_path, header_rows=2):
    """Parse the transaction CSV file, skipping header rows"""
    transactions = []
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        # Skip header rows if needed
        for _ in range(header_rows):
            try:
                next(reader)
            except StopIteration:
                break
        
        # Read transactions
        for row in reader:
            category = row.get('category', '').strip()
            debit = row.get('debit', '').strip()
            credit = row.get('credit', '').strip()
            
            # Get amount (either debit or credit)
            amount = 0.0
            if debit:
                try:
                    amount = abs(float(debit.replace('$', '').replace(',', '')))
                except ValueError:
                    pass
            elif credit:
                try:
                    amount = abs(float(credit.replace('$', '').replace(',', '')))
                except ValueError:
                    pass
            
            if category and amount > 0:
                transactions.append({
                    'category': category,
                    'amount': amount
                })
    
    return transactions

def calculate_max_rewards(transactions, selected_cards, rewards_matrix):
    """Calculate maximum rewards possible with selected cards"""
    if not transactions or not selected_cards:
        return 0.0
    
    total_rewards = 0.0
    
    for transaction in transactions:
        category = transaction['category']
        amount = transaction['amount']
        
        # Map category to matrix category
        matrix_category = map_category_to_matrix_category(category)
        
        # Find best reward rate across all selected cards
        best_rate = 0.0
        
        for card_name in selected_cards:
            # Try exact match first
            if card_name in rewards_matrix:
                card_rewards = rewards_matrix[card_name]
                if matrix_category in card_rewards:
                    rate = card_rewards[matrix_category]
                    if rate > best_rate:
                        best_rate = rate
        
        # Calculate rewards (rate is typically a percentage, so divide by 100)
        rewards = (amount * best_rate) / 100
        total_rewards += rewards
    
    return round(total_rewards, 2)

def main():
    """Main function to process CSV and calculate rewards"""
    if len(sys.argv) < 3:
        print(json.dumps({'error': 'Missing arguments: csv_path and selected_cards'}))
        sys.exit(1)
    
    csv_path = sys.argv[1]
    selected_cards_json = sys.argv[2]
    
    try:
        selected_cards = json.loads(selected_cards_json)
    except json.JSONDecodeError:
        print(json.dumps({'error': 'Invalid JSON for selected cards'}))
        sys.exit(1)
    
    # Load rewards matrix
    rewards_matrix = load_card_rewards_matrix()
    
    # Parse transactions
    transactions = parse_transaction_csv(csv_path)
    
    # Calculate max rewards
    max_rewards = calculate_max_rewards(transactions, selected_cards, rewards_matrix)
    
    # Return result as JSON
    result = {
        'max_rewards': max_rewards,
        'transactions_processed': len(transactions)
    }
    
    print(json.dumps(result))

if __name__ == '__main__':
    main()

