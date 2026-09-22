import type { Category, DiscussionItem, FilterOption, InterestOption, SocialPost } from "./types";

export const CATEGORIES: Category[] = [
  { label: "Music", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f" },
  {
    label: "Food & Drink",
    image:
      "https://images.unsplash.com/photo-1506802913710-40e2e66339c9?q=80&w=987&auto=format&fit=crop",
  },
  { label: "Art", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
  { label: "Technology", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085" },
  { label: "Sports", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b" },
  { label: "Comedy", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac" },

  // --- Added Categories ---
  { label: "Movies & TV", image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4" },
  {
    label: "Fashion & Style",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    label: "Travel & Adventure",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  { label: "Gaming", image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1" },
  { label: "Literature", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794" },
  { label: "Photography", image: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0" },
  { label: "Dance", image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b" },
  { label: "Theatre", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d" },

  {
    label: "Science & Technology",
    image: "https://images.unsplash.com/photo-1581093588401-22da09f5f8b2",
  },
  { label: "History", image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df" },
  { label: "Philosophy", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f" },
  { label: "Education", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b" },
  {
    label: "Culture & Heritage",
    image: "https://images.unsplash.com/photo-1600695234969-e600154b02d8",
  },

  { label: "Health & Fitness", image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1" },
  { label: "Meditation", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773" },
  { label: "Yoga", image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3" },
  {
    label: "Self-Improvement",
    image: "https://images.unsplash.com/photo-1494173853739-c21f58b16055",
  },
  { label: "Mental Health", image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a" },

  {
    label: "Nature & Environment",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  },
  { label: "Social Causes", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7" },
  {
    label: "Sustainability",
    image: "https://images.unsplash.com/photo-1523978591478-c753949ff840",
  },

  {
    label: "Business & Entrepreneurship",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  { label: "Design", image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7" },
  { label: "Writing", image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514" },
  { label: "Craft & DIY", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4" },
  { label: "Architecture", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29" },
];

export const DISCUSSIONS: DiscussionItem[] = [
  {
    id: "d1",
    avatar: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=120&h=120&fit=crop",
    title: "Best spots for golden hour photography?",
    groupTag: "NYC Photography Enthusiasts",
    content:
      "Hey everyone! I'm planning a golden hour shoot this weekend. Any recommendations for scenic spots with great lighting? Looking for something accessible by subway.",
    author: "Sarah Chen",
    time: "2 hours ago",
    likes: 12,
    replies: 5,
  },
  {
    id: "d2",
    avatar: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=120&h=120&fit=crop",
    title: "React 18 Features Discussion",
    groupTag: "Tech Meetup Brooklyn",
    content:
      "What are your thoughts on the new concurrent features in React 18? I've been experimenting with Suspense and it's pretty amazing. Anyone else building production apps with it?",
    author: "Mike Rodriguez",
    time: "4 hours ago",
    likes: 8,
    replies: 12,
  },
];

export const FILTER_OPTIONS: FilterOption[] = [
  { key: "all", label: "All Events (5)" },
  // { key: "upcoming", label: "Upcoming (3)" },
  { key: "past", label: "Past(7)" },
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: "s1",
    slides: "1/3",
    user: {
      name: "Alex Johnson",
      handle: "@alexj",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop",
    },
    tag: "Summer Music Festival",
    tagBackground: "#A684F5",
    tagColor: "#E8DFFF",
    imageUri:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1470&auto=format&fit=crop",
    date: "Jun 15",
    location: "Central Park",
    description:
      "Amazing night at the Summer Music Festival! The energy was incredible! #festival #music #summer",
    likes: 1500,
    comments: 900,
    shares: 72,
    attendees: "4,500 attendees",
    timeAgo: "2 hours ago",
  },
  {
    id: "s2",
    slides: "2/4",
    user: {
      name: "Samantha Lee",
      handle: "@samanthalee",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=faces",
    },
    tag: "Tech Innovators Summit",
    tagColor: "#3478F6",
    tagBackground: "#E1ECFF",
    imageUri:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1470&auto=format&fit=crop",
    date: "Jul 05",
    location: "Downtown Hub",
    description:
      "Day two of the Tech Innovators Summit was full of inspiring talks and hands-on demos. Can’t wait for tomorrow!",
    likes: 986,
    comments: 312,
    shares: 54,
    attendees: "2,300 attendees",
    timeAgo: "5 hours ago",
  },
];

export const INTEREST_OPTIONS: InterestOption[] = [
  {
    id: "music",
    label: "Music",
    icon: "music",
    background: "#F2E8FF",
    accent: "#7F56F5",
    iconBackground: "#E4D4FF",
  },
  {
    id: "technology",
    label: "Technology",
    icon: "technology",
    background: "#E5EEFF",
    accent: "#3E84F8",
    iconBackground: "#D6E4FF",
  },
  {
    id: "food",
    label: "Food & Dining",
    icon: "food-dining",
    background: "#FFF2DD",
    accent: "#F6A610",
    iconBackground: "#FFE4B3",
  },
  {
    id: "art",
    label: "Art & Culture",
    icon: "art-culture",
    background: "#F5E9FF",
    accent: "#A272F7",
    iconBackground: "#E8D4FF",
  },
  {
    id: "sports",
    label: "Sports",
    icon: "sports",
    background: "#E8F8ED",
    accent: "#45A758",
    iconBackground: "#D1F0D9",
  },
  {
    id: "travel",
    label: "Travel",
    icon: "travel",
    background: "#E8F3FF",
    accent: "#4C96FF",
    iconBackground: "#D5E7FF",
  },
  {
    id: "fashion",
    label: "Fashion",
    icon: "fashion",
    background: "#FFE9EE",
    accent: "#F26D88",
    iconBackground: "#FFD1DC",
  },
  {
    id: "gaming",
    label: "Gaming",
    icon: "gaming",
    background: "#F0EDFF",
    accent: "#7C6CF3",
    iconBackground: "#E2DDFF",
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: "fitness",
    background: "#FFF3E8",
    accent: "#F3A662",
    iconBackground: "#FFE4CC",
  },
  {
    id: "business",
    label: "Business",
    icon: "business",
    background: "#E6FAFA",
    accent: "#37A1A8",
    iconBackground: "#D0F3F5",
  },
];
