'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface SearchBarProps {
  className?: string;
}

interface SearchSuggestion {
  id: string;
  name: string;
  category: string;
}

const SearchBar = ({ className = '' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', name: 'Chocolate Croissant', category: 'Pastries' },
    { id: '2', name: 'Sourdough Bread', category: 'Breads' },
    { id: '3', name: 'Blueberry Muffin', category: 'Muffins' },
    { id: '4', name: 'Cinnamon Roll', category: 'Pastries' },
    { id: '5', name: 'Baguette', category: 'Breads' },
    { id: '6', name: 'Red Velvet Cake', category: 'Cakes' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setShowSuggestions(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
        setShowSuggestions(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = mockSuggestions.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/product-details?search=${encodeURIComponent(query.trim())}`);
      setIsExpanded(false);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSearch(suggestions[selectedIndex].name);
      } else {
        handleSearch(searchQuery);
      }
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    handleSearch(suggestion.name);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div
        className={`flex items-center gap-2 bg-input border border-border rounded-md transition-smooth ${
          isExpanded ? 'w-full lg:w-80' : 'w-10 lg:w-64'
        }`}
      >
        <button
          onClick={() => {
            setIsExpanded(true);
            inputRef.current?.focus();
          }}
          className="p-2 text-muted-foreground hover:text-foreground transition-smooth focus:outline-none"
          aria-label="Search"
        >
          <Icon name="MagnifyingGlassIcon" size={20} />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className={`flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none transition-smooth ${
            isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0 lg:w-full lg:opacity-100'
          }`}
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              inputRef.current?.focus();
            }}
            className="p-2 text-muted-foreground hover:text-foreground transition-smooth focus:outline-none"
            aria-label="Clear search"
          >
            <Icon name="XMarkIcon" size={16} />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover rounded-md shadow-warm-lg border border-border overflow-hidden z-dropdown animate-slide-in-from-top max-h-80 overflow-y-auto scrollbar-warm">
          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-smooth ${
                  index === selectedIndex
                    ? 'bg-primary/10 text-primary' :'text-popover-foreground hover:bg-primary/5'
                } focus:outline-none focus:bg-primary/10`}
              >
                <div className="flex items-center gap-3">
                  <Icon name="MagnifyingGlassIcon" size={16} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium">{suggestion.name}</p>
                    <p className="caption text-muted-foreground">{suggestion.category}</p>
                  </div>
                </div>
                <Icon name="ArrowRightIcon" size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;