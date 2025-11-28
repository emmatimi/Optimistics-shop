import type { Product, BlogPost, Testimonial, GalleryImage } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'ho-01',
    name: 'Castor Oil',
    categories: ['Hair Growth', 'Skincare'],
    price: 9000,
    size: '100ml',
    sizes: {
      '60ml': 6000,
      '100ml': 9000,
      '250ml': 20000,
    },
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/castor%20oil.png?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/castor%20oil.png?q=80&w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1579833834244-93b5a7aa1632?q=80&w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1621382490733-4f5b5f2a1b2f?q=80&w=800&auto=format&fit=crop'],
    description: 'Thick nourishing oil for hair, lashes, and brows',
    ingredients: ['100% Pure Castor Oil.'],
    benefits: ['Promotes hair growth and strengthens follicles'],
    usage: 'Apply to scalp, lashes, or brows nightly',
    reviews: [
      { id: 1, author: 'Jessica L.', rating: 5, comment: 'My hair fall has reduced significantly in just a month!', date: '2023-08-15' },
      { id: 2, author: 'Mike R.', rating: 4, comment: 'Smells great and feels very nourishing.', date: '2023-08-10' },
    ],
    isBestseller: true,
    tags: ['hair', 'growth', 'strengthening'],
  },
  {
    id: 'so-01',
    name: 'Radiant Glow Face Shea Butter',
    categories: ['Skincare'],
    price: 5000,
    size: '150g',
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/shea%20butter.jpg?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/shea%20butter.jpg?q=80&w=800&auto=format&fit=crop', 'https://ik.imagekit.io/4lndq5ke52/images/1752880325691.jpg?q=80&w=800&auto=format&fit=crop'],
    description: 'A luxurious, fast-absorbing cream that brightens complexion, soothes dryness, and helps fade scars and stretch marks, and provides deep hydration for a radiant glow.',
    ingredients: ['100% Pure Raw Shea Butter'],
    benefits: ['Brightens skin tone', 'Fades hyperpigmentation', 'Deeply moisturizes', 'Boosts collagen'],
    usage: 'Apply 2-3 drops to cleansed face and neck, morning and night. Can be used alone or before your moisturizer.',
    reviews: [
      { id: 1, author: 'Emily C.', rating: 5, comment: 'This is my holy grail! My skin has never looked better.', date: '2023-09-01' },
      { id: 2, author: 'Sophia T.', rating: 5, comment: 'Absorbs so well and doesn\'t feel greasy.', date: '2023-08-20' },
    ],
    isBestseller: true,
    tags: ['skin', 'glow', 'brightening', 'serum'],
  },
  {
    id: 'bo-01',
    name: 'Clove Oil',
    categories: ['Skincare'],
    price: 2500,
    size: '60ml',
    sizes: {
      '60ml': 2500,
      '100ml': 4000,
      '250ml': 9000,
    },
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/Clove%20Oil.jpg?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/Clove%20Oil.jpg?q=80&w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1598202041215-d72b26b38755?q=80&w=800&auto=format&fit=crop'],
    description: 'A rich and hydrating body oil that locks in moisture, improves skin elasticity, and leaves your skin feeling silky smooth and supple.',
    ingredients: ['Sweet Almond Oil', 'Avocado Oil', 'Vitamin E', 'Lavender Essential Oil'],
    benefits: ['Reduces acne, fights inflammation, supports hair growth.'],
    usage: 'Apply generously to damp skin after a shower or bath to lock in moisture. Massage until absorbed.',
    reviews: [
      { id: 1, author: 'Chloe B.', rating: 5, comment: 'Perfect for my dry skin, especially in winter.', date: '2023-07-12' },
    ],
    tags: ['body', 'hydration', 'soothing'],
  },
  {
    id: 'ho-02',
    name: 'Coconut Oil',
    categories: ['Hair Growth', 'Skincare'],
    price: 6290,
    size: '250ml',
    sizes: {
      '60ml': 2000,
      '100ml': 3500,
      '250ml': 6290,
    },
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/coconut%20oil.png?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/coconut%20oil.png?q=80&w=800&auto=format&fit=crop'],
    description: 'Our pure cold-pressed Coconut Oil is a natural multi-purpose beauty essential. Rich in nourishing fatty acids, it deeply hydrates the skin, softens hair, and helps restore natural shine. Perfect for locking in moisture, soothing dry patches, and strengthening hair strands from root to tip. Lightweight, gentle, and completely natural—ideal for everyday skincare and hair care routines.',
    ingredients: ['100% Pure Cold-Pressed Coconut Oil (from the flesh of mature coconuts).'],
    benefits: ['strengthens hair, reduces dryness', 'helps protect against breakage', 'also helps soothe irritated skin and adds natural shine to hair', 'Detangles hair'],
    usage: 'For Skin: Apply a small amount directly to clean skin and massage gently until absorbed. Use daily as a moisturizer or to soothe dry areas. For Hair: Warm a small amount in your hands and apply to hair from mid-length to ends for shine and softness. For deeper nourishment, massage into scalp and leave for 30–60 minutes before washing out.',
    reviews: [
       { id: 1, author: 'Olivia P.', rating: 4, comment: 'Works well for my frizzy hair, but a little goes a long way.', date: '2023-08-25' },
    ],
    isBestseller: true,
    tags: ['hair', 'frizz-control', 'shine'],
  },
    {
    id: 'so-02',
    name: 'Papaya Oil',
    categories: ['Skincare'],
    price: 2800,
    size: '60ml',
    sizes: {
      '60ml': 2800,
      '100ml': 4500,
      '250ml': 10000,
    },
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/papaya%20oil.png?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/papaya%20oil.png?q=80&w=800&auto=format&fit=crop'],
    description: 'Gently dissolve makeup, impurities, and excess sebum with this calming cleansing oil that leaves skin soft and nourished, not stripped.',
    ingredients: ['Papaya seed oil', 'Jojoba oil', 'Vitamin C'],
    benefits: ['Melts away makeup', 'Reduces redness', 'Non-comedogenic', 'Balances skin'],
    usage: 'Apply daily to face and neck.',
    reviews: [
      { id: 1, author: 'Isabella M.', rating: 5, comment: 'My skin feels so fresh and glowy every morning.!', date: '2023-09-05' },
    ],
    tags: ['skin', 'cleansing', 'calming'],
  },
    {
    id: 'ho-03',
    name: 'Hair Conditioner',
    categories: ['Hair Growth'],
    price: 16500,
    size: '200ml',
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/hair%20conditioner.png?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/hair%20conditioner.png?q=80&w=800&auto=format&fit=crop'],
    description: 'Smooth, softening formula that leaves hair silky and manageable..',
    ingredients: ['Coconut oil', 'Shea butte', 'Aloe Extract'],
    benefits: ['Detangles', ', reduces frizz', 'restores moisture', 'Soothes itchiness'],
    usage: 'Apply after shampoo, leave for 3 minutes, rinse.',
    reviews: [
       { id: 1, author: 'David K.', rating: 5, comment: 'My hair feels so soft and easy to comb now..', date: '2023-08-30' },
    ],
    tags: ['hair', 'scalp', 'detox'],
  },
  {
    id: 'ho-04',
    name: 'Neem Oil',
    categories: ['Hair Growth', 'Skincare'],
    price: 2600,
    size: '60ml',
    sizes: {
      '60ml': 2600,
      '100ml': 4200,
      '250ml': 9500,
    },
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/Neem%20oil.png?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/Neem%20oil.png?q=80&w=800&auto=format&fit=crop'],
    description: 'Healing oil for skin and scalp health.',
    ingredients: ['100% Pure Neem Oil.'],
    benefits: ['Fights acne', 'dandruff', 'and irritation'],
    usage: 'Mix with moisturizer or carrier oil before applying.',
    reviews: [
       { id: 1, author: 'David K.', rating: 5, comment: 'Cleared my dandruff and eased itching fast.', date: '2025-08-30' },
    ],
    tags: ['hair', 'scalp', 'detox'],
  },
  {
    id: 'so-03',
    name: 'Tumeric Oil',
    categories: ['Skincare'],
    price: 2000,
    size: '100ml',
    sizes: {
      '60ml': 1500,
      '100ml': 2000,
      '250ml': 2200,
    },
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/Tumeric%20oil.png?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/Tumeric%20oil.png?q=80&w=800&auto=format&fit=crop'],
    description: 'Glow-enhancing herbal oil for clear, even skin.',
    ingredients: ['Turmeric root oil', ' Coconut oil', 'Vitamin E'],
    benefits: ['Reduces acne scars and hyperpigmentation'],
    usage: 'Apply daily to face and neck.',
    reviews: [
      { id: 1, author: 'Isabella M.', rating: 5, comment: 'The brightening effect is real — love it!', date: '2025-09-05' },
    ],
    tags: ['skin', 'cleansing', 'calming'],
  },
   {
    id: 'so-04',
    name: 'Tumeric Bar Soap',
    categories: ['Skincare'],
    price: 2800,
    size: '120g',
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/tumeric.jpg?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/tumeric.jpg?q=80&w=800&auto=format&fit=crop'],
    description: 'Brightening herbal soap for glowing, even-toned skin..',
    ingredients: ['Turmeric', ' Coconut oil', 'Shea butter'],
    benefits: ['Fades dark spots and improves complexion'],
    usage: 'Use daily on face and body.',
    reviews: [
      { id: 1, author: 'Isabella M.', rating: 5, comment: 'I now have a natural glow with no filter!', date: '2025-09-05' },
    ],
    tags: ['skin', 'cleansing', 'calming'],
  },
   {
    id: 'so-05',
    name: 'Carrot Oil',
    categories: ['Skincare'],
    price: 2000,
    size: '60ml',
    sizes: {
      '60ml': 2000,
      '100ml': 3200,
      '250ml': 7000,
    },
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/carrot%20oil%20(2).png?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/carrot%20oil%20(2).png?q=80&w=800&auto=format&fit=crop'],
    description: 'Radiance-boosting oil for brighter, soft skin',
    ingredients: ['Turmeric', ' Coconut oil', 'Shea butter'],
    benefits: ['Promotes even tone', 'smooth texture', 'and natural glow.'],
    usage: 'Apply daily to face or body.',
    reviews: [
      { id: 1, author: 'Isabella M.', rating: 5, comment: 'I really enjoyed the product,My skin is glowing and looks so fresh!', date: '2025-09-05' },
    ],
    tags: ['skin', 'cleansing', 'calming'],
  },
   {
    id: 'bo-02',
    name: 'Body Butter',
    categories: ['Skincare'],
    price: 5000,
    size: '200g',
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/b%20bt.png?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/b%20bt.png?q=80&w=800&auto=format&fit=crop', 'https://ik.imagekit.io/4lndq5ke52/images/body%20butter.jpg?q=80&w=800&auto=format&fit=crop'],
    description: 'Thick, creamy moisturizer that melts into the skin for lasting softness.',
    ingredients: ['Shea butter', 'Cocoa butter',' Coconut oil', 'Vitamin E.'],
    benefits: ['Deep hydration, smoothes rough skin, improves elasticity, and leaves a natural glow.'],
    usage: 'Massage into skin after bathing or whenever skin feels dry.',
    reviews: [
      { id: 1, author: 'Chloe B.', rating: 5, comment: 'My skin stays soft and glowing all day — no dryness at all', date: '2024-12-12' },
    ],
    tags: ['body', 'hydration', 'soothing'],
  },
   {
    id: 'ho-05',
    name: 'Hair Food',
    categories: ['Hair Growth'],
    price: 16500,
    size: '250g',
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/hair%20food.jpg?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/hair%20food.jpg?q=80&w=800&auto=format&fit=crop'],
    description: 'Nourishing scalp and hair cream designed to strengthen, soften, and protect hair.',
    ingredients: ['Shea butter', 'Coconut oil',' Castor oil',' Herbal extracts', 'Vitamin E.'],
    benefits: ['Moisturizes the scalp', 'reduces breakage', 'strengthens roots', 'and promotes healthy hair growth.'],
    usage: 'Apply directly to scalp and hair strands 3–4 times a week. Massage gently for best results.',
    reviews: [
       { id: 1, author: 'David K.', rating: 5, comment: 'My hair feels softer and thicker — this hair food is a game changer!', date: '2025-08-30' },
    ],
    tags: ['hair', 'scalp', 'detox'],
  },
    {
    id: 'ho-06',
    name: 'African Black Shampoo',
    categories: ['Hair Growth'],
    price: 6500,
    size: '250ml',
    imageUrl: 'https://ik.imagekit.io/4lndq5ke52/images/African%20black%20shampoo.png?q=80&w=400&auto=format&fit=crop',
    images: ['https://ik.imagekit.io/4lndq5ke52/images/African%20black%20shampoo.png?q=80&w=800&auto=format&fit=crop'],
    description: 'Herbal shampoo made from traditional African black soap extracts',
    ingredients: ['African black soap',' Shea butter', 'Tea tree oil',' Neem extract.'],
    benefits: ['Deep cleans scalp, fights dandruff, promotes hair growth, and reduces itching'],
    usage: 'Apply to scalp and lather through hair, rinse thoroughly',
    reviews: [
       { id: 1, author: 'David K.', rating: 5, comment: 'This shampoo stopped my itching and my hair is growing fullerr!', date: '2025-08-30' },
    ],
    tags: ['hair', 'scalp', 'detox'],
  },
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: 'The Ultimate Guide to Cold-Pressed Oils',
        excerpt: 'Discover why cold-pressed oils are superior for your skin and hair, and how to choose the right one for your needs...',
        imageUrl: 'https://images.unsplash.com/photo-1590132338662-316a3a4049e7?q=80&w=400&auto=format&fit=crop',
        author: 'Jane Doe, Founder',
        date: 'September 10, 2023',
        content: 'Full blog post content goes here...'
    },
    {
        id: 2,
        title: '5 Essential Oils for Luscious Hair Growth',
        excerpt: 'Unlock the secrets to longer, stronger hair with these five powerful essential oils. Learn how to incorporate them into your routine...',
        imageUrl: 'https://images.unsplash.com/photo-1621382490733-4f5b5f2a1b2f?q=80&w=400&auto=format&fit=crop',
        author: 'Emily White',
        date: 'August 28, 2023',
        content: 'Full blog post content goes here...'
    },
    {
        id: 3,
        title: 'Oil Cleansing Method: Is It Right For You?',
        excerpt: 'Debunking the myths around using oil to cleanse your face. Find out how this method can transform your skincare game...',
        imageUrl: 'https://images.unsplash.com/photo-1603790173201-9a48a9a5a5c4?q=80&w=400&auto=format&fit=crop',
        author: 'Dr. Anya Sharma',
        date: 'August 15, 2023',
        content: 'Full blog post content goes here...'
    }
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah J.',
        location: 'New York, NY',
        quote: 'Optimistics Naturals has completely transformed my hair. The Miracle Growth Oil is truly a miracle! My hair is thicker and healthier than ever.',
        imageUrl: 'https://picsum.photos/seed/t01/100/100'
    },
    {
        id: 2,
        name: 'Michael B.',
        location: 'Austin, TX',
        quote: 'I was skeptical about face oils, but the Radiant Glow Serum is a game-changer. My skin feels hydrated, and my acne scars are fading.',
        imageUrl: 'https://picsum.photos/seed/t02/100/100'
    },
    {
        id: 3,
        name: 'Priya K.',
        location: 'London, UK',
        quote: 'I love that all the products are natural and cruelty-free. The quality is exceptional, and the results speak for themselves. Highly recommend!',
        imageUrl: 'https://picsum.photos/seed/t03/100/100'
    }
];

export const GALLERY_IMAGES: GalleryImage[] = [
    {
        id: 1,
        beforeUrl: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=400&auto=format&fit=crop',
        afterUrl: 'https://images.unsplash.com/photo-1605593219528-d5867f1ecef3?q=80&w=400&auto=format&fit=crop',
        description: '3 months of using Miracle Growth Hair Oil'
    },
    {
        id: 2,
        beforeUrl: 'https://images.unsplash.com/photo-1559056491-a9d0f41c0338?q=80&w=400&auto=format&fit=crop',
        afterUrl: 'https://images.unsplash.com/photo-1611094054625-f09b52a1c0b3?q=80&w=400&auto=format&fit=crop',
        description: '6 weeks of using Radiant Glow Face Serum'
    },
    {
        id: 3,
        beforeUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400&auto=format&fit=crop',
        afterUrl: 'https://images.unsplash.com/photo-1596755746235-9d38a3ea31cd?q=80&w=400&auto=format&fit=crop',
        description: 'Noticeably reduced hair fall after 2 months'
    },
     {
        id: 4,
        beforeUrl: 'https://images.unsplash.com/photo-1600078292887-75a1e7c53d53?q=80&w=400&auto=format&fit=crop',
        afterUrl: 'https://images.unsplash.com/photo-1596923522244-64bae023e3b3?q=80&w=400&auto=format&fit=crop',
        description: 'Clearer, brighter skin in just 1 month'
    }
];