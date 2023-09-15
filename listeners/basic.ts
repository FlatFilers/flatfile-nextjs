import { FlatfileListener } from '@flatfile/listener'
import { recordHook } from '@flatfile/plugin-record-hook'

/**
 * Example Listener
 */
export const listener = FlatfileListener.create((client) => {
  // client.on('**', async (event) => {
  //   const { spaceId } = event.context
  //   const secret = await event.secrets('TEST', { spaceId })
  //   console.log({ secret })
  // })

  // client.use(
  //   recordHook('contacts', (record) => {
  //     const firstName = record.get('firstName')
  //     console.log({ firstName })
  //     // Gettign the real types here would be nice but seems tricky
  //     record.set('lastName', 'Rock')
  //     return record
  //   })
  // )
  client.use(
    recordHook('TestSheet', (record) => {
      const last_name = record.get('last_name')
      console.log('passing through record hook', last_name)
      if (!last_name) {
        console.log('last_name is required')
        record.addError('last_name', 'Name is required')
      }
      return record
    })
  )
})
