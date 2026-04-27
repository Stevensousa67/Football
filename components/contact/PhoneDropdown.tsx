"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PHONE = "+15083643532";

const options = [
  {
    label: "Call",
    href: `tel:${PHONE}`,
    icon: "/svgs/socials/call.svg",
  },
  {
    label: "SMS",
    href: `sms:${PHONE}`,
    icon: "/svgs/socials/sms.svg",
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${PHONE.replace("+", "")}`,
    icon: "/svgs/socials/whatsapp.svg",
  },
  {
    label: "Telegram",
    href: `tg://resolve?phone=${PHONE.replace("+", "")}`,
    icon: "/svgs/socials/telegram.svg",
  },
];

const sizeMap = {
  sm: "inline-flex size-9 items-center justify-center rounded-xl border border-border bg-card/50 hover:bg-muted transition-colors cursor-pointer",
  md: "inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card hover:bg-muted transition-colors shadow-sm cursor-pointer",
};

export function PhoneDropdown({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          title="Phone"
          aria-label="Contact via phone"
          className={sizeMap[size]}
        >
          <Image
            src="/svgs/socials/phone.svg"
            alt="Phone"
            width={size === "sm" ? 16 : 18}
            height={size === "sm" ? 16 : 18}
            className="dark:invert"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        {options.map(({ label, href, icon }) => (
          <DropdownMenuItem key={label}>
            <a
              href={href}
              target={label === "Call" || label === "SMS" ? undefined : "_blank"}
              rel={label === "Call" || label === "SMS" ? undefined : "noopener noreferrer"}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <Image
                src={icon}
                alt={label}
                width={16}
                height={16}
                className="dark:invert"
              />
              {label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
