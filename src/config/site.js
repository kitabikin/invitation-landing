const site = {
  title: `Kitabikin Undangan`,
  titleHome: `Kitabikin Undangan: Undangan elegan untuk setiap acara`,
  description: `Perlu undangan digital untuk acara Kamu? Yuk, Kitabikin. Pilih dari berbagai gaya, tema, dan warna untuk membuat undangan yang mencerminkan gaya dan personalitas Anda yang unik.`,
  keywords: `undangan digital, undangan online, undangan pernikahan, undangan gratis, website undangan, contoh undangan online, cara membuat undangan digital, online invitation, wedding invitation, kustom, custom, elegan, terjangkau, murah`,
  author: `Kitabikin.com`,
  siteUrl:
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
      ? `https://invitation.kitabikin.com`
      : `http://localhost:1802`,
  image: `vercel.svg`,
  twitterUsername: `@kitabikincom`,
  whatsappNumber: `+6281917240030`,
  cloudinaryPath: `https://res.cloudinary.com/kitabikin/image/upload/v1650191239`,
};

export default site;
