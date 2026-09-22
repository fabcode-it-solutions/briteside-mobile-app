import type { SvgIconName } from "@/components/SvgIcon";
import type { MyEvent } from "@/screens/events/MyEventCard";

export type ProfileTabKey = "posts" | "calendar" | "likes" | "saved";

export const INTEREST_TAGS = ["Music", "Technology", "Food & Dining", "Travel", "Fitness"] as const;

export const INTEREST_ICON_MAP: Record<(typeof INTEREST_TAGS)[number], SvgIconName> = {
  "Music": "music",
  "Technology": "technology",
  "Food & Dining": "pizza",
  "Travel": "travel",
  "Fitness": "fitness",
};

export type ProfileCalendarEvent = {
  id: string;
  imageUri: string;
  title: string;
  dateLabel: string;
  location: string;
  category: {
    label: string;
    backgroundColor: string;
    textColor: string;
  };
};

export type ProfileCollectionBaseItem = {
  id: string;
  imageUri: string;
  author: string;
  authorAvatar: string;
};

export type ProfileLikedItem = ProfileCollectionBaseItem;

export type ProfileSavedItem = ProfileCollectionBaseItem & {
  dateLabel: string;
};

export const PROFILE_EVENTS: MyEvent[] = [
  {
    id: "post-1",
    imageUri: "https://images.unsplash.com/photo-1444824775686-4185f172c44b?q=80&w=1200",
    title: "Alex Johnson",
    description:
      "Amazing night at the Summer Music Festival! The energy was incredible! #festival #music #summer",
    dateTime: "Jul, 20",
    location: "Greenwich Village",
    attendees: 1500,
    likes: 1500,
    comments: 900,
    shares: 120,
  },
  {
    id: "post-2",
    imageUri: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200",
    title: "Alex Johnson",
    description:
      "Amazing night at the Summer Music Festival! The energy was incredible! #festival #music #summer",
    dateTime: "Jul, 20",
    location: "Greenwich Village",
    attendees: 1500,
    likes: 1320,
    comments: 640,
    shares: 98,
  },
  {
    id: "post-3",
    imageUri: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?q=80&w=1200",
    title: "Alex Johnson",
    description:
      "Amazing night at the Summer Music Festival! The energy was incredible! #festival #music #summer",
    dateTime: "Jul, 20",
    location: "Greenwich Village",
    attendees: 1500,
    likes: 1875,
    comments: 1020,
    shares: 140,
  },
];

export const PROFILE_CALENDAR_EVENTS: ProfileCalendarEvent[] = [
  {
    id: "calendar-1",
    imageUri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920",
    title: "Joe's Pizza",
    dateLabel: "Jul, 20",
    location: "Greenwich Village",
    category: {
      label: "Restaurant",
      backgroundColor: "rgba(49, 160, 101, 0.12)",
      textColor: "#257347",
    },
  },
  {
    id: "calendar-2",
    imageUri: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1920",
    title: "The French Laundry",
    dateLabel: "Jul, 25",
    location: "Yountville, CA",
    category: {
      label: "Restaurant",
      backgroundColor: "rgba(49, 160, 101, 0.12)",
      textColor: "#257347",
    },
  },
  {
    id: "calendar-3",
    imageUri: "https://images.unsplash.com/photo-1512070679279-8988d32161be?q=80&w=1920",
    title: "Dune: Part Two",
    dateLabel: "Aug, 5",
    location: "Regal Union Square",
    category: {
      label: "Movie Ticket",
      backgroundColor: "rgba(67, 97, 238, 0.12)",
      textColor: "#435FEF",
    },
  },
];

export const PROFILE_LIKED_ITEMS: ProfileLikedItem[] = [
  {
    id: "liked-1",
    imageUri: "https://images.unsplash.com/photo-1464375117522-1311d6a5b81b?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    id: "liked-2",
    imageUri: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    id: "liked-3",
    imageUri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    id: "liked-4",
    imageUri: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    id: "liked-5",
    imageUri: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    id: "liked-6",
    imageUri: "https://images.unsplash.com/photo-1544616423-f2a5e936f07e?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    id: "liked-7",
    imageUri: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    id: "liked-8",
    imageUri: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    id: "liked-9",
    imageUri: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
];

export const PROFILE_SAVED_ITEMS: ProfileSavedItem[] = [
  {
    id: "saved-1",
    imageUri: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    dateLabel: "Jun, 15",
  },
  {
    id: "saved-2",
    imageUri: "https://images.unsplash.com/photo-1499510318569-35376e03f31c?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    dateLabel: "Jun, 15",
  },
  {
    id: "saved-3",
    imageUri: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    dateLabel: "Jun, 15",
  },
  {
    id: "saved-4",
    imageUri: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    dateLabel: "Jun, 15",
  },
  {
    id: "saved-5",
    imageUri: "https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    dateLabel: "Jun, 15",
  },
  {
    id: "saved-6",
    imageUri: "https://images.unsplash.com/photo-1455906876003-298dd8c44ec8?q=80&w=1600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    dateLabel: "Jun, 15",
  },
];

export const HEADER_MAX_HEIGHT = 500;
export const HEADER_MIN_HEIGHT = 160;
export const CONTENT_PANEL_OVERLAP = HEADER_MIN_HEIGHT - 32;
