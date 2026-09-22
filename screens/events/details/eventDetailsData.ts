import type { EventDetail } from "@/screens/events/types";

export const EVENT_DETAILS_MAP: Record<string, EventDetail> = {
  m1: {
    id: "m1",
    title: "Annual Jazz Festival",
    heroImage:
      "https://img.freepik.com/free-photo/big-ben-westminster-bridge-sunset-london-uk_268835-1395.jpg?t=st=1760615992~exp=1760619592~hmac=0dce0da5f6388373efcd81554a3f542302e986ced4432b7affb12261decddecb&w=2000",
    dateTime: "Tuesday, July 15, 2025 at 7:00 PM",
    locationSummary: "Downtown Jazz Center • New York, NY",
    priceLabel: "$45.00",
    priceCaption: "Per Person",
    attendees: 1200,
    likes: 345,
    organizer: {
      name: "Jazz Society NYC",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=faces",
      role: "Event Organizer",
      isVerified: true,
    },
    description:
      "Join us for the most spectacular jazz festival of the year! Experience three days of incredible music featuring world-renowned jazz artists, local talents, and emerging performers. The festival includes outdoor stages, intimate indoor venues, food trucks, and art installations.",
    location: {
      venue: "Downtown Jazz Center",
      address: "123 Music Ave, Jazz District, NY 10001",
      mapHint: "To view the map, please enter your Mapbox public token.",
      mapPlaceholder: "Enter mapbox public token",
      directionsCta: "Get Directions",
    },
    tickets: [
      {
        id: "general",
        title: "General Admission",
        price: "$45.00",
        feeLabel: "(incl. $6.75 fees)",
        description: "Access to all stages and food truck area.",
        perks: ["All outdoor stages", "General seating", "Food truck access"],
      },
      {
        id: "vip",
        title: "VIP Experience",
        price: "$85.00",
        feeLabel: "(incl. $12.75 fees)",
        description: "Premium experience with exclusive access and perks.",
        perks: ["All access", "VIP seating", "Complimentary drink", "Meet & greet"],
      },
      {
        id: "premium",
        title: "Premium Package",
        price: "$125.00",
        feeLabel: "(incl. $18.75 fees)",
        description: "Ultimate jazz festival experience with luxury amenities.",
        perks: ["All VIP benefits", "Backstage access", "Dinner included", "Exclusive merchandise"],
      },
    ],
    additionalDetails: [
      {
        id: "age",
        label: "Age Requirements",
        value: "All ages welcome",
      },
      {
        id: "dress-code",
        label: "Dress Code",
        value: "Smart Casual",
      },
      {
        id: "what-to-bring",
        label: "What to Bring",
        value: "Valid ID required for entry",
      },
      {
        id: "food-drinks",
        label: "Food & Drinks",
        value: "Food and beverages available for purchase",
      },
      {
        id: "accessibility",
        label: "Accessibility",
        value: "Wheelchair accessible venue with accessible restrooms and parking",
      },
      {
        id: "parking",
        label: "Parking",
        value: "Street parking available. Parking garage located at 5th Street, 2 blocks away ($10/day)",
      },
      {
        id: "cancellation",
        label: "Cancellation Policy",
        value: "Full refund available up to 24 hours before the event. No refunds after that time.",
      },
    ],
    media: [
      {
        id: "media-1",
        type: "photo",
        imageUri:
          "https://images.unsplash.com/photo-1518978621446-dd06b249293c?q=80&w=1470&auto=format&fit=crop",
        caption: "Photo",
        description:
          "Behind the scenes - setting up the main stage for an incredible evening of jazz!",
        postedBy: "Jazz Society NYC",
        postedAt: "2 days ago",
      },
      {
        id: "media-2",
        type: "video",
        imageUri:
          "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1470&auto=format&fit=crop",
        caption: "Video",
        description:
          "Rehearsal highlights from our featured artists. Can’t wait for you to experience this live!",
        postedBy: "Jazz Society NYC",
        postedAt: "2 days ago",
      },
      {
        id: "media-3",
        type: "photo",
        imageUri:
          "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1470&auto=format&fit=crop",
        caption: "Photo",
        description:
          "Behind the scenes - setting up the main stage for an incredible evening of jazz!",
        postedBy: "Jazz Society NYC",
        postedAt: "2 days ago",
      },
      {
        id: "media-4",
        type: "video",
        imageUri:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1470&auto=format&fit=crop",
        caption: "Video",
        description:
          "Rehearsal highlights from our featured artists. Can’t wait for you to experience this live!",
        postedBy: "Jazz Society NYC",
        postedAt: "2 days ago",
      },
    ],
  },
  m2: {
    id: "m2",
    title: "Tech Conference 2025",
    heroImage:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1470&auto=format&fit=crop",
    dateTime: "Friday, June 20, 2025 at 9:00 AM",
    locationSummary: "Innovation Hub • San Francisco, CA",
    priceLabel: "$199.00",
    priceCaption: "Full Access Pass",
    attendees: 1200,
    likes: 980,
    organizer: {
      name: "Tech Innovators Collective",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop&crop=faces",
      role: "Conference Host",
      isVerified: true,
    },
    description:
      "Join industry leaders for a full-day exploration into the future of technology, innovation, and startups. Expect keynote sessions, panel discussions, hands-on workshops, and networking opportunities with founders, investors, and product leaders.",
    location: {
      venue: "Innovation Hub Convention Center",
      address: "500 Market Street, San Francisco, CA 94105",
      mapHint: "Paste your Mapbox public token to load an interactive venue map.",
      mapPlaceholder: "Enter mapbox public token",
      directionsCta: "Open Directions",
    },
    tickets: [
      {
        id: "conference-general",
        title: "Conference Pass",
        price: "$199.00",
        feeLabel: "(incl. $24.85 fees)",
        description: "Full-day conference access with breakfast and lunch included.",
        perks: ["All keynotes", "Breakout sessions", "Expo floor access", "Meals included"],
      },
      {
        id: "conference-vip",
        title: "VIP Summit",
        price: "$299.00",
        feeLabel: "(incl. $38.75 fees)",
        description: "Premium seating plus private roundtables with speakers and investors.",
        perks: ["Priority seating", "Speaker roundtables", "VIP lounge", "Cocktail reception"],
      },
      {
        id: "conference-founder",
        title: "Founder Package",
        price: "$389.00",
        feeLabel: "(incl. $50.35 fees)",
        description: "Startup founders get added investor matchmaking and pitch feedback.",
        perks: [
          "VIP Summit perks",
          "Investor matchmaking",
          "Pitch feedback session",
          "Startup showcase booth",
        ],
      },
    ],
    additionalDetails: [
      {
        id: "agenda",
        label: "Agenda",
        value: "Keynotes, panels, workshops, and startup expo from 9 AM – 6 PM",
      },
      {
        id: "networking",
        label: "Networking",
        value: "Dedicated networking lounge and event app to schedule meetings",
      },
      {
        id: "materials",
        label: "What to Bring",
        value: "Business cards, laptop/tablet for workshops, event ticket (digital accepted)",
      },
      {
        id: "dietary",
        label: "Food & Drinks",
        value: "Breakfast, lunch, and evening reception with dietary accommodations",
      },
      {
        id: "parking-tech",
        label: "Parking & Transit",
        value: "On-site parking garage ($18/day) and direct access to Market St. Muni station",
      },
      {
        id: "refund-tech",
        label: "Refund Policy",
        value: "Tickets are fully refundable up to 30 days prior; transferable up to 48 hours before",
      },
    ],
    media: [
      {
        id: "tech-media-1",
        type: "photo",
        imageUri:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop",
        caption: "Photo",
        description: "Keynote stage packed with innovators during last year's conference.",
        postedBy: "Tech Innovators Collective",
        postedAt: "1 week ago",
      },
      {
        id: "tech-media-2",
        type: "video",
        imageUri:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1470&auto=format&fit=crop",
        caption: "Video",
        description: "Highlights from the startup pitch finals – see founders in action.",
        postedBy: "Tech Innovators Collective",
        postedAt: "1 week ago",
      },
      {
        id: "tech-media-3",
        type: "photo",
        imageUri:
          "https://images.unsplash.com/photo-1475724017904-b712052c192a?q=80&w=1470&auto=format&fit=crop",
        caption: "Photo",
        description: "Hands-on AI workshop with mentors guiding small founder groups.",
        postedBy: "Tech Innovators Collective",
        postedAt: "5 days ago",
      },
      {
        id: "tech-media-4",
        type: "video",
        imageUri:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop",
        caption: "Video",
        description: "Evening networking reception recap featuring investors and founders.",
        postedBy: "Tech Innovators Collective",
        postedAt: "3 days ago",
      },
    ],
  },
};

export const getEventDetailsById = (id: string): EventDetail | undefined => EVENT_DETAILS_MAP[id];
