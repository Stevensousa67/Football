interface socialMedia {
    name: string;
    url: string;
    icon: string;
    isBlack?: boolean;
}

export const socialMedia: socialMedia[] = [
    {
        name: "GitHub",
        url: `${process.env.GitHub_URL}`,
        icon: "/github.svg",
        isBlack: true,
    },
    {
        name: "LinkedIn",
        url: `${process.env.LinkedIn_URL}`,
        icon: "/linkedin.svg",
        isBlack: true,
    },
    {
        name: "Personal Website",
        url: `${process.env.Personal_Website_URL}`,
        icon: "/earth.svg",
        isBlack: true,
    },
    {
        name: "Discord",
        url: `${process.env.Discord_Profile}`,
        icon: "/discord.svg",
        isBlack: true,
    },
    {
        name: "Youtube",
        url: `${process.env.Youtube_URL}`,
        icon: "/youtube.svg",
        isBlack: true,
    }
];