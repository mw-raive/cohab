export const mockProperties = [
  {
    id: 1,
    landlordId: 200,
    landlordName: "Boston Properties LLC",
    landlordRating: 4.8,
    landlordTier: "premium",
    title: "Modern 4BR Near Harvard Medical",
    address: "45 Francis St, Boston, MA 02115",
    lat: 42.3356,
    lng: -71.1067,
    distanceToSchool: 0.3,
    nearestSchool: "Harvard Medical School",
    totalRooms: 4,
    totalBaths: 2,
    totalOccupancy: 4,
    amenities: ["washer_dryer", "parking", "ac", "internet", "furnished_option", "dishwasher"],
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
    ],
    description: "Spacious, recently renovated apartment walking distance from HMS. Perfect for medical students who value quiet study space and modern amenities. Hardwood floors throughout, updated kitchen, and amazing natural light.",
    priceRange: { min: 1400, max: 1800 },
    availableFrom: "Aug 1, 2024",
    leaseOptions: ["semester", "annual"],
    subletAllowed: true,
    subscriptionTier: "premium",
    verified: true,
    reviewCount: 24,
    reviews: [
      { id: 1, author: "Med Student 2023", rating: 5, text: "Perfect for studying. Very quiet building and responsive landlord.", date: "May 2023" },
      { id: 2, author: "HMS Resident", rating: 5, text: "Great location, couldn't walk to school faster. Clean and modern.", date: "Apr 2023" },
      { id: 3, author: "Anonymous Tenant", rating: 4, text: "Nice place, parking was a bit tricky. Would recommend overall.", date: "Feb 2023" }
    ],
    rooms: [
      {
        id: "1A",
        name: "Room 1A — Master Suite",
        size: 280,
        price: 1800,
        furnished: true,
        privateBath: true,
        status: "available",
        photos: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600",
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600"
        ],
        features: ["walk-in closet", "city view", "en-suite bath"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "1B",
        name: "Room 1B — Large Double",
        size: 220,
        price: 1600,
        furnished: true,
        privateBath: false,
        status: "reserved",
        photos: [
          "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"
        ],
        features: ["large windows", "desk included"],
        heldBy: "Group: Harvard Med 2024",
        heldUntil: "48h"
      },
      {
        id: "1C",
        name: "Room 1C — Standard",
        size: 180,
        price: 1400,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [
          "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600"
        ],
        features: ["good natural light", "closet"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "1D",
        name: "Room 1D — Cozy Single",
        size: 150,
        price: 1400,
        furnished: true,
        privateBath: false,
        status: "taken",
        photos: [
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600"
        ],
        features: ["cozy", "street view"],
        heldBy: "Occupied",
        heldUntil: null
      }
    ]
  },
  {
    id: 2,
    landlordId: 201,
    landlordName: "Cambridge Student Housing",
    landlordRating: 4.5,
    landlordTier: "pro",
    title: "Bright 3BR Walk to MIT",
    address: "77 Massachusetts Ave, Cambridge, MA 02139",
    lat: 42.3601,
    lng: -71.0942,
    distanceToSchool: 0.1,
    nearestSchool: "MIT",
    totalRooms: 3,
    totalBaths: 2,
    totalOccupancy: 3,
    amenities: ["internet", "ac", "dishwasher", "bike_storage"],
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ],
    description: "Bright and airy 3-bedroom apartment steps from MIT. Open floor plan, updated kitchen. Perfect for PhD students and researchers.",
    priceRange: { min: 1200, max: 1600 },
    availableFrom: "Sep 1, 2024",
    leaseOptions: ["annual"],
    subletAllowed: false,
    subscriptionTier: "pro",
    verified: true,
    reviewCount: 15,
    reviews: [
      { id: 1, author: "MIT PhD Student", rating: 5, text: "Literally 2 minutes from Building 7. Amazing for busy grad students.", date: "Jun 2023" },
      { id: 2, author: "Engineering Resident", rating: 4, text: "Great space, fast internet, very responsive landlord.", date: "Mar 2023" }
    ],
    rooms: [
      {
        id: "2A",
        name: "Room 2A — Large Corner",
        size: 240,
        price: 1600,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [
          "https://images.unsplash.com/photo-1560185127-6a44db5b0e2c?w=600",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600"
        ],
        features: ["corner windows", "hardwood floors", "large closet"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "2B",
        name: "Room 2B — Standard",
        size: 190,
        price: 1300,
        furnished: false,
        privateBath: false,
        status: "taken",
        photos: [
          "https://images.unsplash.com/photo-1558882224-dda166733046?w=600"
        ],
        features: ["natural light", "closet"],
        heldBy: "Occupied",
        heldUntil: null
      },
      {
        id: "2C",
        name: "Room 2C — Cozy",
        size: 160,
        price: 1200,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600"
        ],
        features: ["cozy", "north-facing"],
        heldBy: null,
        heldUntil: null
      }
    ]
  },
  {
    id: 3,
    landlordId: 202,
    landlordName: "Longwood Properties",
    landlordRating: 4.9,
    landlordTier: "premium",
    title: "Luxury 6BR Student Townhouse",
    address: "18 Longwood Ave, Boston, MA 02115",
    lat: 42.3380,
    lng: -71.1008,
    distanceToSchool: 0.5,
    nearestSchool: "Harvard Medical School",
    totalRooms: 6,
    totalBaths: 3,
    totalOccupancy: 6,
    amenities: ["washer_dryer", "parking", "ac", "internet", "gym_access", "furnished_option", "dishwasher", "rooftop"],
    photos: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
    ],
    description: "Premium townhouse-style living for serious students. Fully renovated with high-end finishes. Rooftop deck, private parking, and gym access included. Perfect for building your study group.",
    priceRange: { min: 1600, max: 2200 },
    availableFrom: "Aug 1, 2024",
    leaseOptions: ["annual"],
    subletAllowed: true,
    subscriptionTier: "premium",
    verified: true,
    reviewCount: 31,
    reviews: [
      { id: 1, author: "HMS Graduate", rating: 5, text: "Best housing experience of my life. Worth every penny.", date: "Jun 2023" },
      { id: 2, author: "Med Student", rating: 5, text: "Rooftop is amazing for summer studying. Landlord is incredible.", date: "May 2023" }
    ],
    rooms: [
      {
        id: "3A",
        name: "Room 3A — Penthouse Suite",
        size: 320,
        price: 2200,
        furnished: true,
        privateBath: true,
        status: "available",
        photos: [
          "https://images.unsplash.com/photo-1617104678098-de229db51175?w=600",
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600"
        ],
        features: ["rooftop access", "king bed", "private bath", "city views"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "3B",
        name: "Room 3B — Double Ensuite",
        size: 260,
        price: 1900,
        furnished: true,
        privateBath: true,
        status: "reserved",
        photos: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600"
        ],
        features: ["en-suite bath", "desk", "large closet"],
        heldBy: "Group: HMS First Years",
        heldUntil: "32h"
      },
      {
        id: "3C",
        name: "Room 3C — Standard Plus",
        size: 200,
        price: 1700,
        furnished: true,
        privateBath: false,
        status: "available",
        photos: [
          "https://images.unsplash.com/photo-1560185127-6a44db5b0e2c?w=600"
        ],
        features: ["furnished", "good light", "closet"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "3D",
        name: "Room 3D — Standard",
        size: 190,
        price: 1650,
        furnished: false,
        privateBath: false,
        status: "taken",
        photos: [],
        features: ["hardwood floors"],
        heldBy: "Occupied",
        heldUntil: null
      },
      {
        id: "3E",
        name: "Room 3E — Cozy Single",
        size: 160,
        price: 1600,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [
          "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=600"
        ],
        features: ["cozy", "closet"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "3F",
        name: "Room 3F — Garden View",
        size: 175,
        price: 1600,
        furnished: false,
        privateBath: false,
        status: "taken",
        photos: [],
        features: ["garden view", "quiet"],
        heldBy: "Occupied",
        heldUntil: null
      }
    ]
  },
  {
    id: 4,
    landlordId: 203,
    landlordName: "Allston Student Rentals",
    landlordRating: 4.2,
    landlordTier: "basic",
    title: "2BR Apartment Near BU",
    address: "233 Bay State Rd, Boston, MA 02215",
    lat: 42.3507,
    lng: -71.1015,
    distanceToSchool: 0.4,
    nearestSchool: "Boston University",
    totalRooms: 2,
    totalBaths: 1,
    totalOccupancy: 2,
    amenities: ["washer_dryer", "internet"],
    photos: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800"
    ],
    description: "Affordable 2-bedroom near BU. Great for undergrads or early grad students on a budget. Quiet street, great neighbors.",
    priceRange: { min: 900, max: 1100 },
    availableFrom: "Sep 1, 2024",
    leaseOptions: ["semester", "annual"],
    subletAllowed: false,
    subscriptionTier: "basic",
    verified: false,
    reviewCount: 8,
    reviews: [
      { id: 1, author: "BU Student", rating: 4, text: "Good value for the money. Landlord is fine.", date: "Apr 2023" }
    ],
    rooms: [
      {
        id: "4A",
        name: "Room 4A — Master",
        size: 200,
        price: 1100,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"
        ],
        features: ["larger closet", "street view"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "4B",
        name: "Room 4B — Standard",
        size: 160,
        price: 900,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
        ],
        features: ["closet", "natural light"],
        heldBy: null,
        heldUntil: null
      }
    ]
  },
  {
    id: 5,
    landlordId: 204,
    landlordName: "Fenway Living Group",
    landlordRating: 4.6,
    landlordTier: "pro",
    title: "Renovated 5BR Near Northeastern",
    address: "56 Hemenway St, Boston, MA 02115",
    lat: 42.3432,
    lng: -71.0930,
    distanceToSchool: 0.2,
    nearestSchool: "Northeastern University",
    totalRooms: 5,
    totalBaths: 2,
    totalOccupancy: 5,
    amenities: ["washer_dryer", "internet", "ac", "furnished_option", "bike_storage"],
    photos: [
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800",
      "https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=800"
    ],
    description: "Fully renovated brownstone near Northeastern, Wentworth, and MFA. Open kitchen, renovated bathrooms, and tons of natural light. Great for co-ops and research students.",
    priceRange: { min: 1100, max: 1500 },
    availableFrom: "Aug 15, 2024",
    leaseOptions: ["semester", "annual"],
    subletAllowed: true,
    subscriptionTier: "pro",
    verified: true,
    reviewCount: 19,
    reviews: [
      { id: 1, author: "NEU Co-op Student", rating: 5, text: "Perfect for co-op rotations. Super flexible landlord.", date: "Jun 2023" },
      { id: 2, author: "Grad Student", rating: 4, text: "Great location, nice renovations. Recommend for the price.", date: "Mar 2023" }
    ],
    rooms: [
      {
        id: "5A",
        name: "Room 5A — Large Front",
        size: 230,
        price: 1500,
        furnished: true,
        privateBath: false,
        status: "available",
        photos: [
          "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600"
        ],
        features: ["bay windows", "furnished", "front-facing"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "5B",
        name: "Room 5B — Standard",
        size: 185,
        price: 1250,
        furnished: false,
        privateBath: false,
        status: "reserved",
        photos: [],
        features: ["closet", "natural light"],
        heldBy: "Group: NEU RISE 2024",
        heldUntil: "12h"
      },
      {
        id: "5C",
        name: "Room 5C — Standard",
        size: 180,
        price: 1250,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [],
        features: ["closet"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "5D",
        name: "Room 5D — Small Single",
        size: 140,
        price: 1100,
        furnished: false,
        privateBath: false,
        status: "taken",
        photos: [],
        features: ["cozy", "quiet side"],
        heldBy: "Occupied",
        heldUntil: null
      },
      {
        id: "5E",
        name: "Room 5E — Garden Level",
        size: 190,
        price: 1150,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [],
        features: ["garden access", "patio door"],
        heldBy: null,
        heldUntil: null
      }
    ]
  },
  {
    id: 6,
    landlordId: 205,
    landlordName: "Harvard Square Rentals",
    landlordRating: 4.7,
    landlordTier: "pro",
    title: "Classic 4BR in Harvard Square",
    address: "12 Bow St, Cambridge, MA 02138",
    lat: 42.3731,
    lng: -71.1190,
    distanceToSchool: 0.7,
    nearestSchool: "Harvard Law School",
    totalRooms: 4,
    totalBaths: 2,
    totalOccupancy: 4,
    amenities: ["washer_dryer", "internet", "ac", "parking"],
    photos: [
      "https://images.unsplash.com/photo-1523192193543-6e7296d960e4?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
    ],
    description: "Classic Cambridge apartment in the heart of Harvard Square. Perfect for law and MBA students who want to be in the action. Close to all dining, shops, and transit.",
    priceRange: { min: 1500, max: 2000 },
    availableFrom: "Aug 1, 2024",
    leaseOptions: ["annual"],
    subletAllowed: false,
    subscriptionTier: "pro",
    verified: true,
    reviewCount: 22,
    reviews: [
      { id: 1, author: "HLS Student", rating: 5, text: "Location is unbeatable. Walk everywhere. Great place.", date: "Jun 2023" }
    ],
    rooms: [
      {
        id: "6A",
        name: "Room 6A — Large Front",
        size: 250,
        price: 2000,
        furnished: false,
        privateBath: true,
        status: "taken",
        photos: [],
        features: ["private bath", "street view"],
        heldBy: "Occupied",
        heldUntil: null
      },
      {
        id: "6B",
        name: "Room 6B — Double",
        size: 200,
        price: 1700,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [
          "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=600"
        ],
        features: ["large windows", "closet"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "6C",
        name: "Room 6C — Standard",
        size: 170,
        price: 1500,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [],
        features: ["closet"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "6D",
        name: "Room 6D — Cozy Single",
        size: 145,
        price: 1500,
        furnished: false,
        privateBath: false,
        status: "reserved",
        photos: [],
        features: ["compact", "quiet"],
        heldBy: "Group: HLS 2026",
        heldUntil: "20h"
      }
    ]
  },
  {
    id: 7,
    landlordId: 206,
    landlordName: "Backbay Student Homes",
    landlordRating: 4.3,
    landlordTier: "basic",
    title: "Affordable 3BR Back Bay Apartment",
    address: "88 Marlborough St, Boston, MA 02116",
    lat: 42.3519,
    lng: -71.0751,
    distanceToSchool: 1.2,
    nearestSchool: "Boston University",
    totalRooms: 3,
    totalBaths: 1,
    totalOccupancy: 3,
    amenities: ["internet", "washer_dryer"],
    photos: [
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800",
      "https://images.unsplash.com/photo-1560185127-6a44db5b0e2c?w=800"
    ],
    description: "Classic Boston brownstone on a quiet residential street. Good value in a prime neighborhood. Short commute to BU, Northeastern, and the medical area.",
    priceRange: { min: 1000, max: 1300 },
    availableFrom: "Sep 1, 2024",
    leaseOptions: ["annual"],
    subletAllowed: false,
    subscriptionTier: "basic",
    verified: false,
    reviewCount: 5,
    reviews: [
      { id: 1, author: "BU Grad", rating: 4, text: "Good value. Classic Boston feel. Landlord takes a few days to respond.", date: "May 2023" }
    ],
    rooms: [
      {
        id: "7A",
        name: "Room 7A — Master",
        size: 220,
        price: 1300,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [],
        features: ["street facing", "large closet"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "7B",
        name: "Room 7B — Standard",
        size: 175,
        price: 1100,
        furnished: false,
        privateBath: false,
        status: "taken",
        photos: [],
        features: ["closet"],
        heldBy: "Occupied",
        heldUntil: null
      },
      {
        id: "7C",
        name: "Room 7C — Single",
        size: 150,
        price: 1000,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [],
        features: ["back-facing", "quiet"],
        heldBy: null,
        heldUntil: null
      }
    ]
  },
  {
    id: 8,
    landlordId: 207,
    landlordName: "Coolidge Corner Properties",
    landlordRating: 4.6,
    landlordTier: "pro",
    title: "Stylish 4BR Brookline Apartment",
    address: "33 Babcock St, Brookline, MA 02446",
    lat: 42.3450,
    lng: -71.1214,
    distanceToSchool: 1.0,
    nearestSchool: "Harvard Medical School",
    totalRooms: 4,
    totalBaths: 2,
    totalOccupancy: 4,
    amenities: ["washer_dryer", "internet", "ac", "dishwasher", "bike_storage", "furnished_option"],
    photos: [
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800",
      "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=800",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"
    ],
    description: "Beautifully appointed apartment in Brookline's Coolidge Corner neighborhood. Stylish interiors, C-line trolley right outside. Perfect mix of neighborhood living and urban access.",
    priceRange: { min: 1300, max: 1700 },
    availableFrom: "Aug 15, 2024",
    leaseOptions: ["annual"],
    subletAllowed: true,
    subscriptionTier: "pro",
    verified: true,
    reviewCount: 18,
    reviews: [
      { id: 1, author: "HMS Resident", rating: 5, text: "Love Coolidge Corner. Great apartment, great neighbors.", date: "Jun 2023" },
      { id: 2, author: "Med Student", rating: 4, text: "Slightly far but the neighborhood is worth it.", date: "Mar 2023" }
    ],
    rooms: [
      {
        id: "8A",
        name: "Room 8A — Large Corner",
        size: 260,
        price: 1700,
        furnished: true,
        privateBath: false,
        status: "available",
        photos: [
          "https://images.unsplash.com/photo-1614944848639-15b28a9e2862?w=600"
        ],
        features: ["corner room", "double closet", "furnished"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "8B",
        name: "Room 8B — Double",
        size: 200,
        price: 1500,
        furnished: false,
        privateBath: false,
        status: "available",
        photos: [],
        features: ["good light", "closet"],
        heldBy: null,
        heldUntil: null
      },
      {
        id: "8C",
        name: "Room 8C — Standard",
        size: 175,
        price: 1350,
        furnished: false,
        privateBath: false,
        status: "reserved",
        photos: [],
        features: ["closet"],
        heldBy: "Group: Brookline Roomies",
        heldUntil: "6h"
      },
      {
        id: "8D",
        name: "Room 8D — Small Single",
        size: 145,
        price: 1300,
        furnished: false,
        privateBath: false,
        status: "taken",
        photos: [],
        features: ["compact", "closet"],
        heldBy: "Occupied",
        heldUntil: null
      }
    ]
  }
]
