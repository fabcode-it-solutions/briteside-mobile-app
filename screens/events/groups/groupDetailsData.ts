import type { GroupDetail } from "@/screens/events/types";

export const GROUP_DETAILS: Record<string, GroupDetail> = {
  g1: {
    id: "g1",
    name: "NYC Photography Enthusiasts",
    heroImage:
      "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?q=80&w=2070&auto=format&fit=crop",
    heroSlidesLabel: "1/3",
    memberCount: 1247,
    location: "Manhattan, NY",
    priceLabel: "$45.00",
    priceCaption: "Monthly",
    description:
      "Weekly photo walks and workshops around the city. All skill levels welcome! We explore different neighborhoods, share techniques, and build a supportive community of photographers.",
    organizer: {
      name: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop",
      role: "Organizer",
      tag: {
        label: "Photography",
        backgroundColor: "#0C8C57",
        textColor: "#FFFFFF",
      },
    },
    actions: {
      joinLabel: "Join Group",
      shareLabel: "Share",
    },
    composer: {
      placeholder: "Share something with the group...",
      currentUserAvatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=120&h=120&fit=crop",
      postButtonLabel: "Post",
    },
    discussions: [
      {
        id: "g1-post-1",
        author: {
          name: "Sarah Kim",
          avatar:
            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=120&h=120&fit=crop",
        },
        postedAgo: "2 hours ago",
        title: "Best camera settings for street photography?",
        message:
          "I'm still learning the basics of street photography. What camera settings do you recommend for capturing candid moments in changing light conditions?",
        mediaUri:
          "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2070&auto=format&fit=crop",
        likes: 12,
        replies: 5,
      },
      {
        id: "g1-post-2",
        author: {
          name: "Lena Ortiz",
          avatar:
            "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=120&h=120&fit=crop",
        },
        postedAgo: "5 hours ago",
        title: "Printing services recommendation?",
        message:
          "Looking for a reliable place in the city to print large format photos with accurate colors. Any favorites you all trust?",
        likes: 8,
        replies: 3,
      },
    ],
    eventsHeading: "Upcoming Events",
    inviteFriendsLabel: "Invite Friends",
    membersHeading: "Members",
    events: [
      {
        id: "g1-event-1",
        coverImage:
          "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?q=80&w=2070&auto=format&fit=crop",
        category: "Photography",
        categoryIcon: "camera",
        memberCount: 1267,
        title: "NYC Photography Enthusiasts",
        description: "Weekly photo walks and workshops around the city. All skill levels welcome!",
        location: "Manhattan, NY",
        priceBadge: "FREE",
        priceValue: "$25.00",
        priceCaption: "Monthly",
        nextEvent: {
          label: "Photo Walk in Central Park",
          datetime: "This Saturday, 2:00 PM",
        },
        tags: ["Photography", "Art", "Outdoor"],
        memberSinceLabel: "Member since October 2024",
        postedAgo: "Posted 2 days ago",
        membershipStatusLabel: "Member",
      },
    ],
    members: [
      {
        id: "g1-member-1",
        name: "Sarah Kim",
        role: "Member",
        avatar:
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=120&h=120&fit=crop",
        profileCtaLabel: "View Profile",
      },
      {
        id: "g1-member-2",
        name: "Mike Rodriguez",
        role: "Member",
        avatar:
          "https://images.unsplash.com/photo-1502767089025-6572583495b0?w=120&h=120&fit=crop",
        profileCtaLabel: "View Profile",
      },
      {
        id: "g1-member-3",
        name: "Emma Johnson",
        role: "Member",
        avatar:
          "https://images.unsplash.com/photo-1544723795-43253780e727?w=120&h=120&fit=crop",
        profileCtaLabel: "View Profile",
      },
      {
        id: "g1-member-4",
        name: "Lena Ortiz",
        role: "Member",
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop",
        profileCtaLabel: "View Profile",
      },
    ],
  },
  g2: {
    id: "g2",
    name: "Tech Innovators NYC",
    heroImage:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=2070&auto=format&fit=crop",
    heroSlidesLabel: "2/4",
    memberCount: 2081,
    location: "Brooklyn, NY",
    priceLabel: "$40.00",
    priceCaption: "Monthly",
    description:
      "Engineers, founders, and product leaders shaping the next wave of AI startups. Weekly demos, office hours, and networking dinners.",
    organizer: {
      name: "Priya Patel",
      avatar:
        "https://images.unsplash.com/photo-1544723795-43253780e727?w=120&h=120&fit=crop",
      role: "Organizer",
      tag: {
        label: "Technology",
        backgroundColor: "#245EEA",
        textColor: "#FFFFFF",
      },
    },
    actions: {
      joinLabel: "Join Group",
      shareLabel: "Share",
    },
    composer: {
      placeholder: "Share something with the group...",
      currentUserAvatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop",
      postButtonLabel: "Post",
    },
    discussions: [
      {
        id: "g2-post-1",
        author: {
          name: "Mike Rodriguez",
          avatar:
            "https://images.unsplash.com/photo-1502767089025-6572583495b0?w=120&h=120&fit=crop",
        },
        postedAgo: "1 hour ago",
        title: "Thoughts on the latest GPT updates?",
        message:
          "OpenAI just announced new multi-modal endpoints. Has anyone tried integrating them into production workflows yet?",
        likes: 21,
        replies: 9,
      },
    ],
    eventsHeading: "Upcoming Meetups",
    inviteFriendsLabel: "Invite Teammates",
    membersHeading: "Members",
    events: [
      {
        id: "g2-event-1",
        coverImage:
          "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=2070&auto=format&fit=crop",
        category: "Technology",
        categoryIcon: "technology",
        memberCount: 2081,
        title: "Tech Innovators NYC",
        description: "Engineers, founders, and product leaders shaping the next wave of AI startups.",
        location: "Brooklyn, NY",
        priceBadge: "FREE",
        priceValue: "$40.00",
        priceCaption: "Monthly",
        nextEvent: {
          label: "AI Product Pitch Night",
          datetime: "Tue, Nov 19 · 6:30 PM",
        },
        tags: ["AI", "Startups", "Pitch"],
        memberSinceLabel: "Member since March 2023",
        postedAgo: "Posted 5 hours ago",
        membershipStatusLabel: "Member",
      },
    ],
    members: [
      {
        id: "g2-member-1",
        name: "Priya Patel",
        role: "Organizer",
        avatar:
          "https://images.unsplash.com/photo-1544723795-43253780e727?w=120&h=120&fit=crop",
        profileCtaLabel: "View Profile",
      },
      {
        id: "g2-member-2",
        name: "Alex Johnson",
        role: "Member",
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop",
        profileCtaLabel: "View Profile",
      },
      {
        id: "g2-member-3",
        name: "Jordan Lee",
        role: "Member",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
        profileCtaLabel: "View Profile",
      },
    ],
  },
  g3: {
    id: "g3",
    name: "Modern Art Collective",
    heroImage:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2070&auto=format&fit=crop",
    heroSlidesLabel: "1/2",
    memberCount: 892,
    location: "Queens, NY",
    priceLabel: "$18.00",
    priceCaption: "Monthly",
    description:
      "Curated gallery visits, pop-up shows, and collaborative art sessions. Connect with artists from across the boroughs.",
    organizer: {
      name: "Maya Fernandez",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=120&h=120&fit=crop",
      role: "Organizer",
      tag: {
        label: "Art & Culture",
        backgroundColor: "#8B55F5",
        textColor: "#FFFFFF",
      },
    },
    actions: {
      joinLabel: "Join Group",
      shareLabel: "Share",
    },
    composer: {
      placeholder: "Share something with the group...",
      currentUserAvatar:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=120&h=120&fit=crop",
      postButtonLabel: "Post",
    },
    discussions: [
      {
        id: "g3-post-1",
        author: {
          name: "Sam Becker",
          avatar:
            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=120&h=120&fit=crop",
        },
        postedAgo: "1 day ago",
        title: "Best frames for canvases?",
        message:
          "Looking for minimalist floating frames that won’t break the bank. Preferably local makers if you have any leads.",
        likes: 5,
        replies: 2,
      },
    ],
    eventsHeading: "Upcoming Gatherings",
    inviteFriendsLabel: "Invite Friends",
    membersHeading: "Members",
    events: [
      {
        id: "g3-event-1",
        coverImage:
          "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2070&auto=format&fit=crop",
        category: "Art & Culture",
        categoryIcon: "art-culture",
        memberCount: 892,
        title: "Modern Art Collective",
        description: "Curated gallery visits, pop-up shows, and collaborative art sessions.",
        location: "Queens, NY",
        priceBadge: "FREE",
        priceValue: "$18.00",
        priceCaption: "Monthly",
        nextEvent: {
          label: "Gallery Night & Mixer",
          datetime: "Fri, Nov 22 · 8:00 PM",
        },
        tags: ["Art", "Culture", "Networking"],
        memberSinceLabel: "Member since July 2024",
        postedAgo: "Posted yesterday",
        membershipStatusLabel: "Member",
      },
    ],
    members: [
      {
        id: "g3-member-1",
        name: "Maya Fernandez",
        role: "Organizer",
        avatar:
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=120&h=120&fit=crop",
        profileCtaLabel: "View Profile",
      },
      {
        id: "g3-member-2",
        name: "Sam Becker",
        role: "Member",
        avatar:
          "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=120&h=120&fit=crop",
        profileCtaLabel: "View Profile",
      },
      {
        id: "g3-member-3",
        name: "Casey Liu",
        role: "Member",
        avatar:
          "https://images.unsplash.com/photo-1544723795-43253780e727?w=120&h=120&fit=crop",
        profileCtaLabel: "View Profile",
      },
    ],
  },
};

export const DEFAULT_GROUP_ID = "g1";

export const getGroupDetailsById = (id?: string): GroupDetail | undefined => {
  if (!id) return undefined;
  return GROUP_DETAILS[id];
};
