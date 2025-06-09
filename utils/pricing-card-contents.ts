import { toast } from "sonner";

export const PriceCardContents: {
  tier: string;
  price: string;
  subText: string;
  btnText: string;
  featuresList: { id: number; content: string }[];
  onClickHandler: () => void;
}[] = [
  {
    tier: "Free",
    price: "0",
    subText: "Best for individuals",
    btnText: "Start for Free",
    featuresList: [
      {
        id: 1,
        content: "Unlimited members",
      },
      {
        id: 2,
        content: "Manage upto 4 teams",
      },
      {
        id: 3,
        content: "Upto 300 issues",
      },
      {
        id: 4,
        content: "Create multiple projects",
      },
      {
        id: 5,
        content: "App integrations",
      },
      {
        id: 6,
        content: "API access (Coming soon)",
      },
    ],
    onClickHandler: () => {
      toast.info("Kindly sign in and you're good to go 🎉");
    },
  },
  {
    tier: "Pro",
    price: "7",
    subText: "Best for teams",
    btnText: "Get started with Pro",
    featuresList: [
      {
        id: 1,
        content: "Everything in Free+",
      },
      {
        id: 2,
        content: "Manage upto 10 teams",
      },
      {
        id: 3,
        content: "Assign more than 1000+ issues",
      },
      {
        id: 4,
        content: "Media uploads",
      },
      {
        id: 5,
        content: "Get roles",
      },
    ],
    onClickHandler: () => {
      toast.info("Pro tier will be available soon!");
    },
  },
  {
    tier: "Business",
    price: "12",
    subText: "Best for businesses",
    btnText: "Join the Business Plan",
    featuresList: [
      {
        id: 1,
        content: "Everything in Free+",
      },
      {
        id: 2,
        content: "Unlimited teams",
      },
      {
        id: 3,
        content: "Unlimited issues",
      },
      {
        id: 4,
        content: "One to one support",
      },
      {
        id: 5,
        content: "Advanced security",
      },
    ],
    onClickHandler: () => {
      toast.info("Business tier will be available soon!");
    },
  },
];
