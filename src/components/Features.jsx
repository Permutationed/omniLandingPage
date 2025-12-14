import React, { useState, useEffect } from 'react'
import { parseTransactionCSV, calculateMaxRewards } from '../utils/calculateRewards'

function Features({ isLoaded }) {
  const [currentEstablishment, setCurrentEstablishment] = useState('establishment')
  const establishments = ['restaurant', 'Starbucks', 'gas station', 'Target', 'grocery store', 'Home Depot', 'coffee shop', 'pharmacy', 'establishment']
  
  const [formData, setFormData] = useState({
    currentCards: [],
    rewardsEarned: ''
  })
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [cardSuggestions, setCardSuggestions] = useState([])
  const [allCards, setAllCards] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(1) // 1: Choose Cards, 2: Upload Statements, 3: Results
  const [isLoading, setIsLoading] = useState(false)
  const [maxRewards, setMaxRewards] = useState(0)

  // Curated selection of popular credit cards for display
  const cardImages = [
    'Chase Sapphire Preferred Card.png',
    'Chase Sapphire Reserve.png',
    'American Express Platinum Card.png',
    'American Express Gold Card.png',
    'Capital One Venture X Rewards Credit Card.png',
    'Capital One Venture Rewards Credit Card.png',
    'Capital One SavorOne Cash Rewards Credit Card.png',
    'Citi Double Cash.png',
    'Discover it Cash Back.png',
    'Amazon Visa.png',
    'Prime Visa.png',
    'Bank of America Premium Rewards Elite.png',
    'Bilt World Elite Mastercard.png',
    'Chase Freedom Unlimited.png',
    'Chase Freedom Flex.png',
    'Blue Cash Preferred Card from American Express.png',
    'Blue Cash Everyday Card from American Express.png',
    'Hilton Honors American Express Aspire Card.png',
    'Marriott Bonvoy Boundless.png',
    'IHG One Rewards Premier Credit Card.png'
  ]

  // Load card names from CSV
  useEffect(() => {
    fetch('/card_rewards_matrix.csv')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n')
        const cards = lines.slice(1) // Skip header
          .map(line => {
            const cardName = line.split(',')[0]
            return cardName && cardName.trim()
          })
          .filter(card => card && card !== 'App' && card !== 'Resources')
        setAllCards(cards)
      })
      .catch(err => console.error('Error loading cards:', err))
  }, [])

  // Filter cards based on search input
  useEffect(() => {
    if (searchInput.trim().length > 0) {
      const filtered = allCards.filter(card =>
        card.toLowerCase().includes(searchInput.toLowerCase()) &&
        !formData.currentCards.includes(card)
      ).slice(0, 10) // Limit to 10 suggestions
      setCardSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setCardSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchInput, allCards, formData.currentCards])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.card-autocomplete-container')) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Rotate establishment text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEstablishment((prev) => {
        const currentIndex = establishments.indexOf(prev)
        const nextIndex = (currentIndex + 1) % establishments.length
        return establishments[nextIndex]
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'searchInput') {
      setSearchInput(value)
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleCardSelect = (cardName) => {
    if (!formData.currentCards.includes(cardName)) {
      setFormData(prev => ({
        ...prev,
        currentCards: [...prev.currentCards, cardName]
      }))
    }
    setSearchInput('')
    setShowSuggestions(false)
  }

  const handleCardRemove = (cardName) => {
    setFormData(prev => ({
      ...prev,
      currentCards: prev.currentCards.filter(card => card !== cardName)
    }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files])
    }
  }

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Section 1: The Best Card. Always */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 
              style={{fontFamily: "'EB Garamond', 'EB Garamond Fallback', serif", animationDelay: isLoaded ? '0.8s' : '0s'}} 
              className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
            >
              The Best Card. Always.
            </h2>
            <div 
              style={{animationDelay: isLoaded ? '1.0s' : '0s'}} 
              className={`text-2xl md:text-3xl lg:text-4xl text-gray-300 max-w-3xl mx-auto ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
            >
              <p className="mb-3">Have the best card when you walk into {['Starbucks', 'Target', 'Home Depot'].includes(currentEstablishment) ? '' : 'a'}</p>
              <p className="text-white font-semibold min-h-[3rem] transition-all duration-500">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                  {currentEstablishment}
                </span>
              </p>
            </div>
          </div>

          {/* Scrolling Card Band */}
          <div className="mt-12 overflow-hidden">
            <div className="card-scroll-container">
              <div className="card-scroll-track">
                {/* First set of cards */}
                {cardImages.map((cardImage, index) => (
                  <div key={`first-${index}`} className="card-scroll-item">
                    <div className="aspect-[1.586/1] w-32 md:w-40 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                      <img
                        src={`/card_images/${cardImage}`}
                        alt={cardImage.replace(/\.(png|jpg|webp|jpeg)$/i, '')}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {cardImages.map((cardImage, index) => (
                  <div key={`second-${index}`} className="card-scroll-item">
                    <div className="aspect-[1.586/1] w-32 md:w-40 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                      <img
                        src={`/card_images/${cardImage}`}
                        alt={cardImage.replace(/\.(png|jpg|webp|jpeg)$/i, '')}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Store All Cards in One Secure Wallet */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text */}
            <div className="text-left">
              <h2 
                style={{fontFamily: "'EB Garamond', 'EB Garamond Fallback', serif", animationDelay: isLoaded ? '1.2s' : '0s'}} 
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
              >
                Store all cards in
                <br />
                one secure wallet
              </h2>
              <p 
                style={{animationDelay: isLoaded ? '1.3s' : '0s'}} 
                className={`text-sm md:text-base text-white leading-relaxed ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
              >
                On Android and iOS, we use OS-approved NFC and network tokenization to present the optimal card. All credentials are protected by hardware-backed security (Secure Element / StrongBox), so your data never leaves your device and transactions settle directly with your bank.
              </p>
            </div>

            {/* Right: Overlapping iPhone Images */}
            <div 
              style={{animationDelay: isLoaded ? '1.4s' : '0s'}} 
              className={`relative ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
            >
              {/* Larger iPhone image */}
              <div className="relative z-10">
                <img
                  src="/assets/iphones/iPhones.png"
                  alt="iPhone showing secure wallet"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              {/* Smaller overlapping iPhone image */}
              <div className="absolute -bottom-8 -right-8 md:-right-12 z-20 w-3/4 max-w-xs">
                <img
                  src="/assets/iphones/iPhones (1).png"
                  alt="iPhone showing card management"
                  className="w-full rounded-2xl shadow-2xl border-4 border-gray-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: see how much you're missing out */}
        <div className="max-w-4xl mx-auto">
          <h2 
            style={{fontFamily: "'EB Garamond', 'EB Garamond Fallback', serif", animationDelay: isLoaded ? '1.5s' : '0s'}} 
            className={`text-4xl md:text-6xl font-bold text-white mb-4 text-center ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
          >
            See How Much You're Missing Out
          </h2>
          <p 
            style={{animationDelay: isLoaded ? '1.5s' : '0s'}} 
            className={`text-xs text-gray-400 text-center mb-8 ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
          >
            *we do not save any of this data
          </p>
          
          <div 
            style={{animationDelay: isLoaded ? '1.6s' : '0s'}} 
            className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
          >
            {/* Phase 1: Choose Your Cards */}
            {currentPhase === 1 && (
              <div className="space-y-6">
                <div className="relative card-autocomplete-container">
                  <label htmlFor="card-search" className="block text-sm font-semibold text-white/80 mb-2">
                    Choose Your Cards
                  </label>
                  
                  {/* Selected Cards Tags */}
                  {formData.currentCards.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.currentCards.map((card, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl px-4 py-2 text-sm text-white backdrop-blur-sm shadow-lg"
                        >
                          {card}
                          <button
                            type="button"
                            onClick={() => handleCardRemove(card)}
                            className="text-white/70 hover:text-white transition hover:scale-110"
                          >
                            <i className="fas fa-times text-xs"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Autocomplete Input */}
                  <div className="relative">
                    <input
                      id="card-search"
                      name="searchInput"
                      type="text"
                      value={searchInput}
                      onChange={handleInputChange}
                      onFocus={() => searchInput.length > 0 && setShowSuggestions(true)}
                      placeholder="Type to search for cards..."
                      className="w-full rounded-2xl border border-white/15 bg-white/5 backdrop-blur-lg px-4 py-3 text-white placeholder-white/50 focus:border-purple-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    
                    {/* Suggestions Dropdown */}
                    {showSuggestions && cardSuggestions.length > 0 && (
                      <div className="absolute z-50 w-full mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-h-60 overflow-y-auto">
                    {cardSuggestions.map((card, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleCardSelect(card)}
                        className="w-full text-left px-4 py-3 text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl border-b border-white/5 last:border-b-0"
                      >
                        {card}
                      </button>
                    ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPhase(2)}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-all group"
                  >
                    <span className="text-sm font-medium">Next</span>
                    <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Phase 2: Upload Statement(s) */}
            {currentPhase === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="file-upload" className="block text-sm font-semibold text-white/80 mb-2">
                    Upload Statement(s)
                  </label>
                  <div className="relative">
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.csv,.xlsx"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-3 w-full rounded-2xl border-2 border-dashed border-white/20 bg-white/5 px-6 py-8 text-white/70 hover:border-white/40 hover:bg-white/10 cursor-pointer transition"
                    >
                      <i className="fas fa-cloud-upload-alt text-2xl"></i>
                      <span className="text-sm font-medium">
                        {uploadedFiles.length > 0 ? `${uploadedFiles.length} file(s) uploaded` : 'Click to upload or drag and drop'}
                      </span>
                    </label>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2">
                          <div className="flex items-center gap-2 text-sm text-white/80">
                            <i className="fas fa-file text-green-400"></i>
                            <span>{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300 transition"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPhase(1)}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-all group"
                  >
                    <i className="fas fa-arrow-left text-sm group-hover:-translate-x-1 transition-transform"></i>
                    <span className="text-sm font-medium">Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      setIsLoading(true)
                      try {
                        console.log('Starting rewards calculation...')
                        
                        // Process uploaded CSV files
                        let allTransactions = []
                        
                        for (const file of uploadedFiles) {
                          if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                            console.log('Processing file:', file.name)
                            const text = await file.text()
                            const transactions = parseTransactionCSV(text)
                            console.log('Found transactions:', transactions.length)
                            allTransactions = [...allTransactions, ...transactions]
                          }
                        }
                        
                        console.log('Total transactions:', allTransactions.length)
                        console.log('Selected cards:', formData.currentCards)
                        
                        // Calculate max rewards
                        const rewards = await calculateMaxRewards(allTransactions, formData.currentCards)
                        console.log('Calculated rewards:', rewards)
                        
                        setMaxRewards(rewards)
                        setCurrentPhase(3)
                        setIsLoading(false)
                      } catch (error) {
                        console.error('Error calculating rewards:', error)
                        setMaxRewards(0)
                        setCurrentPhase(3)
                        setIsLoading(false)
                      }
                    }}
                    disabled={isLoading || uploadedFiles.length === 0}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin text-sm"></i>
                        <span className="text-sm font-medium">Loading...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-medium">See Rewards</span>
                        <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Phase 3: Max Rewards Earned Possible */}
            {currentPhase === 3 && (
              <div className="space-y-6 text-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Max Rewards Earned Possible
                  </h3>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                      ${maxRewards.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <p className="text-white/70 text-sm">
                      Based on your selected cards and spending patterns
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPhase(2)}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-all group"
                  >
                    <i className="fas fa-arrow-left text-sm group-hover:-translate-x-1 transition-transform"></i>
                    <span className="text-sm font-medium">Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPhase(1)
                      setFormData({ currentCards: [], rewardsEarned: '' })
                      setUploadedFiles([])
                      setSearchInput('')
                    }}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-all group"
                  >
                    <i className="fas fa-redo text-sm group-hover:rotate-180 transition-transform"></i>
                    <span className="text-sm font-medium">Restart</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Features
