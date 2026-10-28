import { clientIp, hashValue, quotaStatus } from './_quota'
import { json } from './_http'

export async function onRequestGet(context: any) {
  const { env, request } = context
  try {
    return json(await quotaStatus(env, { ipHash: await hashValue(env, 'ip', clientIp(request)) }))
  } catch (error) {
    console.error('Visualizer quota error', error)
    return json({ error: 'quota-unavailable' }, 500)
  }
}
