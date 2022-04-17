const site = {
  title: `Kitabikin Undangan`,
  titleHome: `Kitabikin Undangan`,
  description: `Perlu undangan digital untuk acara Kamu? Yuk, Kitabikin.`,
  keywords: `undangan digital, undangan online, undangan pernikahan, undangan gratis, website undangan, contoh undangan online, cara membuat undangan digital, online invitation, wedding invitation`,
  author: `Kitabikin.com`,
  siteUrl:
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
      ? `https://invitation.kitabikin.com`
      : `https://invitation-dev.kitabikin.com`,
  image: `vercel.svg`,
  twitterUsername: `@kitabikincom`,
  whatsappNumber: `+6281917240030`,
  cloudinaryPath: `https://res.cloudinary.com/kitabikin/image/upload/v1650191239`,
};

export default site;
