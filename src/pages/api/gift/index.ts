import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const jsonDirectory = path.join(process.cwd(), 'src/json');
      const fileContents = await fs.readFile(
        jsonDirectory + '/gift.json',
        'utf8',
      );

      return res.status(200).send({
        code: 200,
        error: 0,
        message: 'Retrieve data successfully.',
        data: JSON.parse(fileContents),
      });
    } catch (err) {
      return res.status(500).send({
        code: 500,
        error: 1,
        message: err.message,
        type: 'UnknownError',
        data: {},
      });
    }
  }
}
