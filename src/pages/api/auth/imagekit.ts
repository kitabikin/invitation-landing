import { NextApiRequest, NextApiResponse } from 'next';
import ImageKit from 'imagekit';

const ikUrl = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const ikPub = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const ikPri = process.env.IMAGEKIT_PRIVATE_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const imagekit = new ImageKit({
      urlEndpoint: ikUrl,
      publicKey: ikPub,
      privateKey: ikPri,
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );

    const result = imagekit.getAuthenticationParameters();
    res.send(result);
  }
}
