export const church = {
  name: "First Congregational Church of St. Albans",
  denomination: "United Church of Christ",
  address: "27 Church Street, St. Albans, Vermont 05478",
  phone: "(802) 524-4555",
  phoneHref: "tel:+18025244555",
  email: "info@firstcongregationalstalbans.org",
  facebook: "https://www.facebook.com/1stCongregationalChurchStAlbans/",
  giveUrl: "https://giv.li/c4dzwq",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=First+Congregational+Church+27+Church+Street+St+Albans+VT+05478",
} as const;

export const navigation = [
  { label: "Visit", href: "/visit" },
  { label: "Worship", href: "/worship" },
  { label: "What’s on", href: "/whats-on" },
  { label: "About", href: "/about" },
] as const;

export type EventCategory =
  | "all"
  | "worship"
  | "music"
  | "community"
  | "reflection";

export const eventCategories: { label: string; value: EventCategory }[] = [
  { label: "All", value: "all" },
  { label: "Worship", value: "worship" },
  { label: "Music", value: "music" },
  { label: "Community", value: "community" },
  { label: "Reflection & learning", value: "reflection" },
];

export const events: {
  title: string;
  cadence: string;
  time: string;
  location: string;
  description: string;
  category: Exclude<EventCategory, "all">;
  accent: "brick" | "green" | "gold" | "sky";
  confirm?: boolean;
}[] = [
  {
    title: "Sunday Worship",
    cadence: "Every Sunday",
    time: "10:00 am",
    location: "Sanctuary · 27 Church Street",
    description:
      "An hour of worship shaped by music, meditation, hymn-singing, and a welcoming spirit. Coffee and treats follow.",
    category: "worship",
    accent: "brick",
  },
  {
    title: "Mindful Awareness with Jonathan",
    cadence: "Thursdays",
    time: "8:00 am",
    location: "Sanctuary",
    description: "A quiet Thursday-morning gathering for mindful awareness and reflection.",
    category: "reflection",
    accent: "sky",
    confirm: true,
  },
  {
    title: "AHA Art Club",
    cadence: "Thursdays",
    time: "12:00 pm",
    location: "Contact the office for location",
    description:
      "A creative outlet with instruction, materials, and good cheer. No experience is necessary; donations are welcome.",
    category: "community",
    accent: "gold",
    confirm: true,
  },
  {
    title: "Going Deeper",
    cadence: "August 22 & 29",
    time: "10:00 am–12:00 pm",
    location: "Contact the office for location",
    description:
      "Open, exploratory conversations about faith, Christian life, and the questions that give life meaning.",
    category: "reflection",
    accent: "green",
    confirm: true,
  },
  {
    title: "Choir at First Congregational",
    cadence: "September–mid-June",
    time: "Seasonal",
    location: "Sanctuary",
    description:
      "Singers who read music or learn by ear are welcome. Contact the office before coming to a rehearsal.",
    category: "music",
    accent: "brick",
    confirm: true,
  },
];

export const programCards = [
  {
    number: "01",
    eyebrow: "Sunday worship",
    title: "A thoughtful hour together",
    description:
      "Music, meditation, hymn-singing, and reflection—followed by coffee, treats, and time to talk.",
    image: "/images/sanctuary.webp",
    alt: "The center aisle and wooden pews leading toward the chancel and organ pipes.",
    href: "/worship",
    link: "See what Sunday feels like",
  },
  {
    number: "02",
    eyebrow: "Music & the arts",
    title: "Make a joyful sound",
    description:
      "Choir, organ, piano, art, and community concerts bring the sanctuary to life in every season.",
    image: "/images/music-stained-glass.webp",
    alt: "Organ pipes, stained glass, and carved timberwork in the sanctuary.",
    href: "/worship#music",
    link: "Explore music and art",
  },
  {
    number: "03",
    eyebrow: "Community life",
    title: "Room to gather and grow",
    description:
      "Reflection groups, shared meals, community meetings, and local care find a home under this roof.",
    image: "/images/fellowship.webp",
    alt: "The open, wood-floored fellowship hall beneath dark timber beams.",
    href: "/whats-on#programs",
    link: "Find your next gathering",
  },
] as const;

export const stories = [
  {
    date: "August 18, 2026",
    type: "Reflection",
    title: "A reflection from our church inbox",
    description:
      "A recent note for pausing, wondering, and carrying the week with a little more intention.",
    href: "https://us2.campaign-archive.com/?u=c3b0f27b150464c3c9a292afc&id=262a1510bc",
  },
  {
    date: "August 14, 2026",
    type: "Weekly update",
    title: "Going deeper, together",
    description:
      "This week’s church update shares a new invitation to conversation and the life happening around it.",
    href: "https://mailchi.mp/firstcongregationalstalbans/who-uses-the-building-8761104",
  },
  {
    date: "July 24, 2026",
    type: "Around the building",
    title: "Who uses the building?",
    description:
      "A glimpse at the groups, gatherings, and everyday community work making use of this historic space.",
    href: "https://mailchi.mp/firstcongregationalstalbans/who-uses-the-building",
  },
] as const;

export const gallery = [
  {
    src: "/images/arrival-exterior.webp",
    alt: "The church and clock tower seen across a green lawn.",
    caption: "Beside Taylor Park",
    className: "gallery-wide",
  },
  {
    src: "/images/sanctuary-balcony.webp",
    alt: "View from the rear balcony across the sunlit sanctuary toward the chancel.",
    caption: "The sanctuary from the balcony",
    className: "gallery-tall",
  },
  {
    src: "/images/organ-console.webp",
    alt: "The wooden console of the church’s historic tracker organ.",
    caption: "The historic tracker organ",
    className: "",
  },
  {
    src: "/images/community-rooms.webp",
    alt: "View from the fellowship hall through the library toward the kitchen.",
    caption: "Rooms connected for community life",
    className: "",
  },
  {
    src: "/images/fellowship.webp",
    alt: "The open, wood-floored fellowship hall beneath dark timber beams.",
    caption: "Fellowship Hall",
    className: "gallery-tall",
  },
  {
    src: "/images/clock-tower.webp",
    alt: "The church roofline and four-faced clock tower.",
    caption: "Keeping time over St. Albans",
    className: "",
  },
  {
    src: "/images/bell.webp",
    alt: "The historic bell and timber supports inside the clock tower.",
    caption: "Inside the bell tower",
    className: "",
  },
  {
    src: "/images/taylor-park.webp",
    alt: "Taylor Park with its fountain, gazebo, and the church beyond.",
    caption: "A church in the heart of town",
    className: "gallery-wide",
  },
] as const;

export const visitDates = [
  { short: "Aug 23", long: "Sunday, August 23, 2026" },
  { short: "Aug 30", long: "Sunday, August 30, 2026" },
  { short: "Sep 6", long: "Sunday, September 6, 2026" },
] as const;

export const seatingChoices = [
  "Front",
  "Middle",
  "Back",
  "Aisle",
  "Accessible area",
  "No preference",
] as const;
