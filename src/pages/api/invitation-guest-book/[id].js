const coreUrl = process.env.NEXT_PUBLIC_CORE_URL

export default async function handler(req, res) {
  try {
    const { id } = req.query
    const update = {
      confirmation: 'yes',
      is_checkin: true,
    }

    const response = await fetch(`${coreUrl}/v1/invitation-guest-book/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    })
    const data = await response.json()

    return res.status(200).send({
      code: 200,
      error: 0,
      message: 'Successfully updated data.',
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
