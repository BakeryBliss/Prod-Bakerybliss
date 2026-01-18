'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface GallerySectionProps {
  className?: string;
}

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  thumbnail?: string;
  title: string;
  category: string;
}

const GallerySection = ({ className = '' }: GallerySectionProps) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const galleryItems: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    src: "https://images.unsplash.com/photo-1610851467843-fe4a65aea9c0",
    alt: 'Professional baker in white apron carefully piping cream onto chocolate cupcakes in bright modern kitchen',
    title: 'Cupcake Decoration',
    category: 'process'
  },
  {
    id: '2',
    type: 'image',
    src: "https://images.unsplash.com/photo-1560370114-b9b119b90cce",
    alt: 'Rustic wooden shelves displaying freshly baked artisan breads and pastries in warm bakery lighting',
    title: 'Fresh Baked Goods',
    category: 'products'
  },
  {
    id: '3',
    type: 'image',
    src: "https://images.unsplash.com/photo-1577086965164-6752ed50d6d1",
    alt: 'Elegant three-tier white wedding cake decorated with fresh pink roses and gold accents on marble stand',
    title: 'Wedding Cake',
    category: 'products'
  },
  {
    id: '4',
    type: 'image',
    src: "https://images.unsplash.com/photo-1653404267191-e314df0fec4f",
    alt: 'Industrial stainless steel commercial oven with multiple racks of golden croissants baking inside',
    title: 'Baking Process',
    category: 'workspace'
  },
  {
    id: '5',
    type: 'image',
    src: "https://images.unsplash.com/photo-1457194940697-8bfb3d2489bc",
    alt: 'Assorted colorful French macarons arranged in neat rows displaying various flavors and pastel colors',
    title: 'French Macarons',
    category: 'products'
  },
  {
    id: '6',
    type: 'image',
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1a2603bed-1765780456409.png",
    alt: 'Baker hands kneading fresh dough on flour-dusted wooden table in traditional bakery kitchen',
    title: 'Artisan Bread Making',
    category: 'process'
  },
  {
    id: '7',
    type: 'video',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_198aca950-1768146898155.png",
    alt: 'Video thumbnail showing baker decorating cake in professional kitchen',
    title: 'Cake Decorating Tutorial',
    category: 'process'
  },
  {
    id: '8',
    type: 'image',
    src: "https://images.unsplash.com/photo-1639338085998-d42088d4560a",
    alt: 'Cozy bakery interior with wooden tables, hanging plants, and display case filled with pastries',
    title: 'Our Bakery Space',
    category: 'workspace'
  },
  {
    id: '9',
    type: 'image',
    src: "https://images.unsplash.com/photo-1725697537895-67e03db24384",
    alt: 'Decadent chocolate layer cake with ganache drip and fresh berries on white cake stand',
    title: 'Chocolate Celebration Cake',
    category: 'products'
  }];


  const categories = [
  { id: 'all', label: 'All' },
  { id: 'products', label: 'Products' },
  { id: 'process', label: 'Process' },
  { id: 'workspace', label: 'Workspace' }];


  const filteredItems =
  activeCategory === 'all' ?
  galleryItems :
  galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section className={`bg-secondary/30 ${className}`}>
      <div className="mx-auto px-5 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl text-foreground mb-4">
              Our Gallery
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our workspace, baking process, and delicious creations
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) =>
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-primary ${
              activeCategory === category.id ?
              'bg-primary text-primary-foreground' :
              'bg-card text-foreground hover:bg-primary/10'}`
              }>

                {category.label}
              </button>
            )}
          </div>

          {/* Masonry Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) =>
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden shadow-warm-md hover:shadow-warm-lg transition-smooth cursor-pointer"
              onClick={() => openLightbox(item)}>

                <div className="relative h-64 overflow-hidden bg-muted">
                  {item.type === 'image' ?
                <AppImage
                  src={item.src}
                  alt={item.alt || item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth" /> :


                <>
                      <AppImage
                    src={item.thumbnail || item.src}
                    alt={item.alt || item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth" />

                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Icon name="PlayIcon" size={32} className="text-primary ml-1" />
                        </div>
                      </div>
                    </>
                }
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end">
                  <div className="p-4 w-full">
                    <p className="font-heading text-white text-lg">{item.title}</p>
                    <p className="caption text-white/80 mt-1">
                      {categories.find((c) => c.id === item.category)?.label}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem &&
      <div
        className="fixed inset-0 bg-black/90 z-modal flex items-center justify-center p-4"
        onClick={closeLightbox}>

          <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-smooth focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close lightbox">

            <Icon name="XMarkIcon" size={24} className="text-white" />
          </button>

          <div
          className="max-w-5xl w-full"
          onClick={(e) => e.stopPropagation()}>

            {selectedItem.type === 'image' ?
          <div className="relative rounded-lg overflow-hidden">
                <AppImage
              src={selectedItem.src}
              alt={selectedItem.alt || selectedItem.title}
              className="w-full max-h-[80vh] object-contain" />

              </div> :

          <div className="relative rounded-lg overflow-hidden">
                <div className="relative w-full h-0 pb-[56.25%]">
                  <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={selectedItem.src}
                title={selectedItem.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
                </div>
              </div>
          }
            <div className="mt-4 text-center">
              <p className="font-heading text-white text-xl">{selectedItem.title}</p>
              <p className="caption text-white/70 mt-2">
                {categories.find((c) => c.id === selectedItem.category)?.label}
              </p>
            </div>
          </div>
        </div>
      }
    </section>);

};

export default GallerySection;