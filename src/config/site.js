const site = {
  title: `Invitation by Kitabikin`,
  description: `Invitation by Kitabikin`,
  author: `Kitabikin.com`,
  siteUrl:
    process.env.ENVIRONMENT === 'production'
      ? `https://invitation.kitabikin.com`
      : `https://invitation-dev.kitabikin.com`,
  image: `vercel.svg`,
  twitterUsername: `@kitabikincom`,
}

export default site
