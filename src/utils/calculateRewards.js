// Cache for rewards matrix
let rewardsMatrixCache = null

// Load and parse card rewards matrix (with caching)
export async function loadCardRewardsMatrix() {
  // Return cached version if available
  if (rewardsMatrixCache) {
    return rewardsMatrixCache
  }
  
  try {
    const response = await fetch('/card_rewards_matrix.csv')
    const text = await response.text()
    const lines = text.split('\n').filter(line => line.trim())
    
    if (lines.length === 0) return {}
    
    // Parse CSV header
    const headers = parseCSVLine(lines[0])
    const rewardsMatrix = {}
    
    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue
      
      const values = parseCSVLine(lines[i])
      if (values.length === 0) continue
      
      const cardName = values[0]?.trim()
      if (!cardName) continue
      
      rewardsMatrix[cardName] = {}
      
      for (let j = 1; j < headers.length && j < values.length; j++) {
        const category = headers[j]?.trim()
        if (!category) continue
        
        const rewardRate = values[j]?.trim() || '0'
        rewardsMatrix[cardName][category] = parseFloat(rewardRate) || 0.0
      }
    }
    
    // Cache the result
    rewardsMatrixCache = rewardsMatrix
    return rewardsMatrix
  } catch (error) {
    console.error('Error loading rewards matrix:', error)
    return {}
  }
}

// Helper to parse CSV line (handles quoted values)
function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  
  return result
}

// Map transaction category to card rewards matrix category
export function mapCategoryToMatrixCategory(category) {
  const categoryLower = category.toLowerCase().trim()
  
  const categoryMapping = {
    // Restaurants
    'restaurant': 'Restaurants (U.S.)',
    'dining': 'Restaurants (U.S.)',
    'food & drink': 'Restaurants (U.S.)',
    'fast food': 'Fast Food',
    'coffee': 'Restaurants (U.S.)',
    'cafe': 'Restaurants (U.S.)',
    
    // Grocery
    'grocery': 'Grocery stores (U.S.)',
    'supermarket': 'Grocery stores (U.S.)',
    'grocery store': 'Grocery stores (U.S.)',
    'target': 'Target',
    'walmart': 'Grocery stores (U.S.)',
    'whole foods': 'Whole Foods',
    'costco': 'Wholesale Club',
    
    // Gas
    'gas': 'Gas stations (U.S.)',
    'gas station': 'Gas stations (U.S.)',
    'fuel': 'Gas stations (U.S.)',
    'exxon': 'Gas stations (U.S.)',
    'shell': 'Gas stations (U.S.)',
    'chevron': 'Gas stations (U.S.)',
    
    // Travel
    'airline': 'Airlines',
    'air travel': 'Airlines',
    'hotel': 'Hotel',
    'car rental': 'Car Rental',
    'travel': 'Travel',
    'uber': 'Ride-Sharing',
    'lyft': 'Ride-Sharing',
    
    // Shopping
    'amazon': 'Amazon',
    'home depot': 'Home Improvement',
    'lowes': 'Home Improvement',
    'department store': 'Department Stores',
    
    // Entertainment
    'entertainment': 'Entertainment',
    'streaming': 'Streaming services',
    'netflix': 'Streaming services',
    'spotify': 'Streaming services',
    
    // Other
    'pharmacy': 'Drugstore',
    'drugstore': 'Drugstore',
    'cvs': 'Drugstore',
    'walgreens': 'Drugstore',
    'starbucks': 'Starbucks',
    
    // Default fallback
    'other': 'Other purchases',
    'general': 'Other purchases',
  }
  
  // Direct match
  if (categoryLower in categoryMapping) {
    return categoryMapping[categoryLower]
  }
  
  // Partial match
  for (const [key, value] of Object.entries(categoryMapping)) {
    if (categoryLower.includes(key)) {
      return value
    }
  }
  
  // Default to "Other purchases" if no match
  return 'Other purchases'
}

// Parse transaction CSV file
export function parseTransactionCSV(csvText, headerRows = 2) {
  const lines = csvText.split('\n').filter(line => line.trim())
  const transactions = []
  
  if (lines.length === 0) return transactions
  
  // Find the actual header row (look for 'category', 'debit', 'credit')
  let headerIndex = -1
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i].toLowerCase()
    if (line.includes('category') && (line.includes('debit') || line.includes('credit'))) {
      headerIndex = i
      break
    }
  }
  
  if (headerIndex === -1) {
    // Fallback: use headerRows
    headerIndex = Math.min(headerRows - 1, lines.length - 1)
  }
  
  // Parse header
  const headers = parseCSVLine(lines[headerIndex])
  
  const categoryIndex = headers.findIndex(h => h.toLowerCase().includes('category'))
  const debitIndex = headers.findIndex(h => h.toLowerCase().includes('debit'))
  const creditIndex = headers.findIndex(h => h.toLowerCase().includes('credit'))
  
  if (categoryIndex === -1 || (debitIndex === -1 && creditIndex === -1)) {
    console.warn('Could not find required columns in CSV')
    return transactions
  }
  
  // Parse transactions (limit to reasonable number for performance)
  const maxTransactions = 10000
  const startIndex = headerIndex + 1
  
  for (let i = startIndex; i < Math.min(lines.length, startIndex + maxTransactions); i++) {
    if (!lines[i].trim()) continue
    
    const values = parseCSVLine(lines[i])
    if (values.length === 0) continue
    
    const category = values[categoryIndex]?.trim() || ''
    const debit = values[debitIndex]?.trim() || ''
    const credit = values[creditIndex]?.trim() || ''
    
    // Get amount (either debit or credit)
    let amount = 0.0
    if (debit) {
      const debitValue = debit.replace(/[$,\s]/g, '')
      amount = Math.abs(parseFloat(debitValue)) || 0.0
    } else if (credit) {
      const creditValue = credit.replace(/[$,\s]/g, '')
      amount = Math.abs(parseFloat(creditValue)) || 0.0
    }
    
    if (category && amount > 0) {
      transactions.push({
        category: category,
        amount: amount
      })
    }
  }
  
  return transactions
}

// Calculate maximum rewards possible with selected cards
export async function calculateMaxRewards(transactions, selectedCards) {
  if (!transactions || transactions.length === 0 || !selectedCards || selectedCards.length === 0) {
    return 0.0
  }
  
  // Load rewards matrix
  const rewardsMatrix = await loadCardRewardsMatrix()
  
  // First, build a map of max reward rates for each category across all selected cards
  const maxRatesByCategory = {}
  
  // Go through each selected card and find max rate for each category
  for (const cardName of selectedCards) {
    if (cardName in rewardsMatrix) {
      const cardRewards = rewardsMatrix[cardName]
      
      // For each category in this card's rewards
      for (const [category, rate] of Object.entries(cardRewards)) {
        if (!maxRatesByCategory[category] || rate > maxRatesByCategory[category]) {
          maxRatesByCategory[category] = rate
        }
      }
    }
  }
  
  // Now calculate rewards for each transaction using the max rates
  let totalRewards = 0.0
  
  for (const transaction of transactions) {
    const category = transaction.category
    const amount = transaction.amount
    
    // Map category to matrix category
    const matrixCategory = mapCategoryToMatrixCategory(category)
    
    // Get the max reward rate for this category (from our pre-calculated map)
    const bestRate = maxRatesByCategory[matrixCategory] || 0.0
    
    // Calculate rewards (rate is typically a percentage, so divide by 100)
    const rewards = (amount * bestRate) / 100
    totalRewards += rewards
  }
  
  return Math.round(totalRewards * 100) / 100 // Round to 2 decimal places
}

