const site = {
  title: `Kitabikin Undangan`,
  titleHome: `Kitabikin Undangan: Kelola, Lihat, Bagikan`,
  description: `Kamu perlu undangan digital? Yuk, Kitabikin. Gratis!`,
  keywords: `undangan digital, undangan online, undangan pernikahan, undangan gratis, website undangan, contoh undangan online, cara membuat undangan digital, online invitation, wedding invitation`,
  author: `Kitabikin.com`,
  siteUrl:
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
      ? `https://invitation.kitabikin.com`
      : `https://invitation-dev.kitabikin.com`,
  image: `vercel.svg`,
  twitterUsername: `@kitabikincom`,
}

export default site
