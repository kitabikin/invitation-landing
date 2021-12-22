const coreUrl = process.env.NEXT_PUBLIC_CORE_URL

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const insert = req.body

      const response = await fetch(`${coreUrl}/v1/theme-guest-book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(insert),
      })
      const data = await response.json()

      return res.status(200).send({
        code: 200,
        error: 0,
        message: 'Successfully added data.',
        data: data.data,
      })
    } catch (err) {
      return res.status(500).send({
        code: 500,
        error: 1,
        message: err.message,
        type: 'UnknownError',
        data: {},
      })
    }
  }
}
