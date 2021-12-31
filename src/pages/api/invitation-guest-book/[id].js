import { format } from 'date-fns'
import { id as localeID } from 'date-fns/locale'

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL

export default async function handler(req, res) {
  try {
    const { id } = req.query
    const update = {
      confirmation: 'yes',
      is_checkin: true,
      checkin_at: format(new Date(), `yyyy-MM-dd HH:mm:ss.SSSxxx`, {
        locale: localeID,
      }),
    }

    const response = await fetch(`${coreUrl}/v1/invitation-guest-book/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    })
    const data = await response.json()

    res.writeHead(302, {
      Location: '/guest-book/' + data.data.id_invitation_guest_book,
    })
    res.end()
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
