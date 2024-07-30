import { makeElectricContext } from 'electric-sql/react'
import { useEffect, useState } from 'react'
import { uniqueTabId } from 'electric-sql/util'
import { LIB_VERSION } from 'electric-sql/version'
import { ElectricDatabase, electrify } from 'electric-sql/wa-sqlite'
import type { Electric } from './generated/client'

import { authToken } from './auth'
import { schema } from './generated/client'

const { ElectricProvider, useElectric } = makeElectricContext<Electric>()

const { tabId } = uniqueTabId()
const scopedDbName = `basic-${LIB_VERSION}-${tabId}.db`

const ElectricProviderComponent = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [electric, setElectric] = useState<Electric>()

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      const config = {
        debug: import.meta.env.DEV,
        url: import.meta.env.ELECTRIC_SERVICE,
      }

      const conn = await ElectricDatabase.init(scopedDbName)
      const client = await electrify(conn, schema, config)
      await client.connect(authToken())

      if (!isMounted) {
        return
      }

      setElectric(client)
    }

    init()

    return () => {
      isMounted = false
    }
  }, [])

  if (electric === undefined) {
    return null
  }

  return <ElectricProvider db={electric}>{children}</ElectricProvider>
}

export { ElectricProviderComponent as ElectricProvider, useElectric }
