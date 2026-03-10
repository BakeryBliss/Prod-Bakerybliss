import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface InstagramPost {
  id: string;
  image: string;
  alt: string;
  likes: number;
  comments: number;
}

interface InstagramFeedProps {
  className?: string;
}

const InstagramFeed = ({ className = '' }: InstagramFeedProps) => {
  // Original Instagram fetch images - commented out as we don't have live Instagram images yet
  // const posts: InstagramPost[] = [
  // {
  //   id: '1',
  //   image: "https://images.unsplash.com/photo-1561702856-b4ec96854ed8",
  //   alt: 'Elegant three-tier wedding cake with white fondant and pink roses',
  //   likes: 342,
  //   comments: 28
  // },
  // {
  //   id: '2',
  //   image: "https://images.unsplash.com/photo-1620129214122-1fe83e80747f",
  //   alt: 'Golden flaky croissants arranged on marble surface',
  //   likes: 289,
  //   comments: 15
  // },
  // {
  //   id: '3',
  //   image: "https://img.rocket.new/generatedImages/rocket_gen_img_166497f71-1767136322607.png",
  //   alt: 'Colorful macarons in various flavors on white plate',
  //   likes: 421,
  //   comments: 34
  // },
  // {
  //   id: '4',
  //   image: "https://images.unsplash.com/photo-1473447547337-5770a453122d",
  //   alt: 'Rustic sourdough bread with crispy crust on wooden board',
  //   likes: 267,
  //   comments: 19
  // },
  // {
  //   id: '5',
  //   image: "https://images.unsplash.com/photo-1662687923931-18c60d75b2fe",
  //   alt: 'Chocolate layer cake with ganache frosting and berries',
  //   likes: 398,
  //   comments: 42
  // },
  // {
  //   id: '6',
  //   image: "https://images.unsplash.com/photo-1679582398746-a1ef88942cb3",
  //   alt: 'Fresh blueberry muffins with sugar topping in basket',
  //   likes: 312,
  //   comments: 21
  // }];

  // Using popular product images
  const posts: InstagramPost[] = [
  {
    id: '1',
    image: 'https://lkylfnhhevpafyboenub.supabase.co/storage/v1/object/public/product-images/cakes/Choco-Ferrero-Birthday-Drip-Cake.jpg',
    alt: 'Choco Ferrero Birthday Drip Cake',
    likes: 342,
    comments: 28
  },
  {
    id: '2',
    image: 'https://lkylfnhhevpafyboenub.supabase.co/storage/v1/object/public/product-images/brownie/sq-roasted-classic-choco-delish-brownie.jpeg',
    alt: 'Choco Delish Walnut Brownie',
    likes: 289,
    comments: 15
  },
  {
    id: '3',
    image: 'https://lkylfnhhevpafyboenub.supabase.co/storage/v1/object/public/product-images/cheesecakes/viscous-blueberry-cheesecake-cake.jpeg',
    alt: 'Blueberry Cheesecake',
    likes: 421,
    comments: 34
  },
  {
    id: '4',
    image: 'https://lkylfnhhevpafyboenub.supabase.co/storage/v1/object/public/product-images/cakes/KitKat-Bars-Cake.jpg',
    alt: 'KitKat Bars Cake',
    likes: 267,
    comments: 19
  },
  {
    id: '5',
    image: 'https://lkylfnhhevpafyboenub.supabase.co/storage/v1/object/public/product-images/cookies/crumbly-choco-chip-cookies.jpeg',
    alt: 'Chocolate Chip Cookies',
    likes: 398,
    comments: 42
  },
  {
    id: '6',
    image: 'https://lkylfnhhevpafyboenub.supabase.co/storage/v1/object/public/product-images/jar%20cakes/Nutella-Hazelnut-Jar.jpg',
    alt: 'Nutella Hazelnut Jar Cake',
    likes: 312,
    comments: 21
  }];


  return (
    <section className={`py-16 lg:py-24 bg-muted ${className}`}>
      <div className="mx-auto px-5 lg:px-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="CameraIcon" size={32} className="text-primary" />
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground">
              Follow Us on Instagram
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get inspired by our daily creations and behind-the-scenes moments
          </p>
          <a
            href="https://instagram.com/blissbakeryindia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 transition-smooth font-medium">

            <span>@blissbakeryindia</span>
            <Icon name="ArrowTopRightOnSquareIcon" size={18} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post) =>
          <a
            key={post.id}
            href="https://instagram.com/blissbakeryindia"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-lg overflow-hidden shadow-warm hover:shadow-warm-lg transition-smooth">

              <AppImage
              src={post.image}
              alt={post.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-smooth" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end justify-center p-4">
                <div className="flex items-center gap-4 text-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="HeartIcon" size={18} variant="solid" />
                    <span className="caption font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="ChatBubbleLeftIcon" size={18} variant="solid" />
                    <span className="caption font-medium">{post.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          )}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com/blissbakeryindia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2">

            <Icon name="CameraIcon" size={20} />
            <span>Follow Us</span>
          </a>
        </div>
      </div>
    </section>);

};

export default InstagramFeed;