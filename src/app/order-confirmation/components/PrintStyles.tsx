'use client';

export default function PrintStyles() {
  return (
    <style jsx global>{`
      @media print {
        header,
        nav,
        .print\\:hidden {
          display: none !important;
        }
        
        body {
          background: white !important;
        }
        
        .bg-card,
        .bg-muted {
          background: white !important;
          border: 1px solid #e5e7eb !important;
        }
      }
    `}</style>
  );
}