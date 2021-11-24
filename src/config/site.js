const site = {
  title: `Invitation Landing`,
  description: `Description Invitation Landing`,
  author: `Kitabikin.com`,
  siteUrl:
    process.env.NODE_ENV === 'development'
      ? `https://dev.invitation.com`
      : `https://invitation.com`,
  image: `vercel.svg`,
  twitterUsername: `@kitabikincom`,
}

export default site
