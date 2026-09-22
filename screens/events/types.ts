import type { SvgIconName } from "@/components/SvgIcon";
import type { MyEvent } from "./MyEventCard";

export type BottomTabType = "social" | "events" | "groups";

export type FilterType = "all" | "upcoming" | "past";

export type FilterOption = {
  key: FilterType;
  label: string;
};

export type EventItem = {
  id: string;
  imageUri: string;
  title: string;
  dateTime: string;
  location: string;
  price: string;
  attendees: number;
};

export type GroupItem = {
  id: string;
  imageUri: string;
  name: string;
  category?: string;
  description?: string;
  location: string;
  members: number;
  tags: string[];
  priceBadge?: string;
  priceValue?: string;
  priceCaption?: string;
  nextEvent?: {
    title: string;
    date: string;
  };
  onPressJoin?: () => void;
  onPressShare?: () => void;
};

export type GroupDiscussionPost = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  postedAgo: string;
  title: string;
  message: string;
  mediaUri?: string;
  likes: number;
  replies: number;
};

export type GroupEvent = {
  id: string;
  coverImage: string;
  category: string;
  categoryIcon?: SvgIconName;
  memberCount: number;
  title: string;
  description: string;
  location: string;
  priceBadge: string;
  priceValue: string;
  priceCaption: string;
  nextEvent: {
    label: string;
    datetime: string;
  };
  tags: string[];
  memberSinceLabel?: string;
  postedAgo: string;
  membershipStatusLabel?: string;
};

export type GroupMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  profileCtaLabel?: string;
};

export type GroupDetail = {
  id: string;
  name: string;
  heroImage: string;
  heroSlidesLabel?: string;
  memberCount: number;
  location: string;
  priceLabel: string;
  priceCaption: string;
  description: string;
  organizer: {
    name: string;
    avatar: string;
    role: string;
    tag: {
      label: string;
      backgroundColor: string;
      textColor: string;
    };
  };
  actions: {
    joinLabel: string;
    shareLabel: string;
  };
  composer: {
    placeholder: string;
    currentUserAvatar: string;
    postButtonLabel: string;
  };
  discussions: GroupDiscussionPost[];
  events: GroupEvent[];
  members: GroupMember[];
  eventsHeading?: string;
  membersHeading?: string;
  inviteFriendsLabel?: string;
};

export type DiscussionItem = {
  id: string;
  avatar: string;
  title: string;
  groupTag?: string;
  content: string;
  author: string;
  time: string;
  likes: number;
  replies: number;
};

export type SocialPost = {
  id: string;
  slides: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  tag: string;
  tagColor: string;
  tagBackground: string;
  imageUri: string;
  date: string;
  location: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  attendees: string;
  timeAgo: string;
};

export type EventTicketTier = {
  id: string;
  title: string;
  price: string;
  feeLabel: string;
  description: string;
  perks: string[];
};

export type EventAdditionalDetail = {
  id: string;
  label: string;
  value: string;
};

export type EventMediaItem = {
  id: string;
  type: "photo" | "video";
  imageUri: string;
  caption: string;
  description: string;
  postedBy: string;
  postedAt: string;
};

export type EventDetail = {
  id: string;
  title: string;
  heroImage: string;
  dateTime: string;
  locationSummary: string;
  priceLabel: string;
  priceCaption: string;
  attendees: number;
  likes: number;
  organizer: {
    name: string;
    avatar: string;
    role: string;
    isVerified: boolean;
  };
  description: string;
  location: {
    venue: string;
    address: string;
    mapHint: string;
    mapPlaceholder: string;
    directionsCta: string;
  };
  tickets: EventTicketTier[];
  additionalDetails: EventAdditionalDetail[];
  media: EventMediaItem[];
};

export type InterestOption = {
  id: string;
  label: string;
  icon: SvgIconName;
  background: string;
  accent: string;
  iconBackground: string;
};

export type Category = {
  label: string;
  image: string;
};

export type EventsKeyExtractorItem = EventItem | GroupItem | MyEvent;
