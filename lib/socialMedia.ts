export interface SocialMedia {
  name: string
  url: string
  icon: string
  isBlack?: boolean
  type?: "link" | "email"
}

const baseUrl = "/svgs/"

export const socialMedia: SocialMedia[] = [
  {
    name: "GitHub",
    url: "https://www.github.com/Stevensousa67",
    icon: `${baseUrl}github.svg`,
    isBlack: true,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/stevenssousa/",
    icon: `${baseUrl}linkedin.svg`,
    isBlack: true,
  },
  {
    name: "Email",
    url: "mailto:silver.steven@hotmail.com",
    icon: `${baseUrl}mail.svg`,
    isBlack: true,
    type: "email",
  },
  {
    name: "Website",
    url: "https://stevensousa.com",
    icon: `${baseUrl}earth.svg`,
    isBlack: true,
  }
]

// Footer socials: GitHub, LinkedIn, Email, Website
export const publicSocials = socialMedia

// Contact "Find me on": GitHub, LinkedIn, Website
export const contactSocials = socialMedia.filter((s) =>
  ["GitHub", "LinkedIn", "Website"].includes(s.name),
)
