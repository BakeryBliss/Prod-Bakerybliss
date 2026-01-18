'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DeliveryOption {
  id: string;
  type: 'pickup' | 'delivery';
  label: string;
  description: string;
  fee: number;
  icon: string;
}

interface DeliveryOptionsProps {
  onSelectOption: (option: DeliveryOption) => void;
}

const DeliveryOptions = ({ onSelectOption }: DeliveryOptionsProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('delivery');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'delivery',
      type: 'delivery',
      label: 'Home Delivery',
      description: 'Get it delivered to your doorstep',
      fee: 5.99,
      icon: 'TruckIcon',
    },
    {
      id: 'pickup',
      type: 'pickup',
      label: 'Store Pickup',
      description: 'Pick up from our bakery',
      fee: 0,
      icon: 'BuildingStorefrontIcon',
    },
  ];

  const handleOptionSelect = (option: DeliveryOption) => {
    setSelectedOption(option.id);
    onSelectOption(option);
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      });
    }
    return dates;
  };

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM',
  ];

  return (
    <div className="bg-card rounded-md border border-border p-6">
      <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
        Delivery Options
      </h2>

      {/* Delivery Method Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {deliveryOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className={`p-4 rounded-md border-2 transition-smooth text-left ${
              selectedOption === option.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            } focus:outline-none focus:ring-2 focus:ring-ring`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-md ${selectedOption === option.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                <Icon name={option.icon as any} size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground">{option.label}</h3>
                  <span className="data-text font-medium text-primary">
                    {option.fee === 0 ? 'FREE' : `$${option.fee.toFixed(2)}`}
                  </span>
                </div>
                <p className="caption text-muted-foreground">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Date and Time Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="delivery-date" className="caption text-muted-foreground mb-2 block">
            Select Date
          </label>
          <select
            id="delivery-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Choose a date</option>
            {generateDateOptions().map((date) => (
              <option key={date.value} value={date.value}>
                {date.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="delivery-time" className="caption text-muted-foreground mb-2 block">
            Select Time Slot
          </label>
          <select
            id="delivery-time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Choose a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Delivery Address (only for delivery option) */}
      {selectedOption === 'delivery' && (
        <div className="mt-6 p-4 bg-muted/50 rounded-md border border-border">
          <div className="flex items-start gap-3">
            <Icon name="MapPinIcon" size={20} className="text-primary mt-1" />
            <div>
              <p className="font-medium text-foreground mb-1">Delivery Address</p>
              <p className="caption text-muted-foreground">
                123 Baker Street, Apt 4B\nSpringfield, IL 62701\nUnited States
              </p>
              <button className="caption text-primary hover:text-primary/80 transition-smooth mt-2 focus:outline-none focus:underline">
                Change Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Store Location (only for pickup option) */}
      {selectedOption === 'pickup' && (
        <div className="mt-6 p-4 bg-muted/50 rounded-md border border-border">
          <div className="flex items-start gap-3">
            <Icon name="BuildingStorefrontIcon" size={20} className="text-primary mt-1" />
            <div>
              <p className="font-medium text-foreground mb-1">BakeryBliss Store</p>
              <p className="caption text-muted-foreground">
                456 Main Street\nSpringfield, IL 62701\nOpen: Mon-Sat 8AM-8PM, Sun 9AM-6PM
              </p>
              <button className="caption text-primary hover:text-primary/80 transition-smooth mt-2 focus:outline-none focus:underline">
                View on Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryOptions;