'use client';

import Icon from '@/components/ui/AppIcon';

interface PrintReceiptButtonProps {
  orderNumber: string;
}

const PrintReceiptButton = ({ orderNumber }: PrintReceiptButtonProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex justify-center print:hidden">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-md font-medium hover:bg-primary/10 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
      >
        <Icon name="PrinterIcon" size={20} />
        <span>Print Receipt</span>
      </button>
    </div>
  );
};

export default PrintReceiptButton;