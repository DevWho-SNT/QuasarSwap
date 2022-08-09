import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.quasarswap.net/contact-us",
      },
      {
        label: "Blog",
        href: "https://quasarswap.medium.com/",
      },
      {
        label: "Community",
        href: "https://docs.quasarswap.net/contact-us/telegram",
      },
      {
        label: "CAKE",
        href: "https://docs.quasarswap.net/tokenomics/cake",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://quasarswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.quasarswap.net/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.quasarswap.net/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.quasarswap.net/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/quasarswap",
      },
      {
        label: "Documentation",
        href: "https://docs.quasarswap.net",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@quasarswap-1/s/quasarswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.quasarswap.net/help/faq#is-quasarswap-safe-has-quasarswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.quasarswap.net/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: "Twitter",
    href: "https://twitter.com/SwapQuasar",
  },
  // {
  //   label: "Telegram",
  //   icon: "Telegram",
  //   items: [
  //     {
  //       label: "Community",
  //       href: "https://t.me/quasarswapcommunity",
  //     },
  //     {
  //       label: "Official",
  //       href: "https://t.me/quasarswapofficial",
  //     }
  //   ],
  // },
  /*{
    label: "Reddit",
    icon: "Reddit",
    href: "https://reddit.com/r/quasarswap",
  },
  {
    label: "Instagram",
    icon: "Instagram",
    href: "https://instagram.com/quasarswap_official",
  },
  {
    label: "Github",
    icon: "Github",
    href: "https://github.com/quasarswap/",
  },*/
  {
    label: "Discord",
    icon: "Discord",
    href: "https://discord.gg/6Xd2h3SnaB",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
