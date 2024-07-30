import { useLiveQuery } from 'electric-sql/react'
import { useEffect } from 'react'
import { genUUID } from 'electric-sql/util'
import type { Account, Post } from '~/generated/client'

import { useElectric } from '~/ElectricProvider'

export const Component = () => {
  return <Example />
}

const Example = () => {
  const { db } = useElectric()!
  const { results } = useLiveQuery(db.post.liveMany())

  useEffect(() => {
    const syncItems = async () => {
      // Resolves when the shape subscription has been established.
      const shape = await db.post.sync()

      // Resolves when the data has been synced into the local database.
      await shape.synced
    }

    syncItems()
  }, [])

  const addItem = async () => {
    await db.post.create({
      data: {
        content: 'Hello, World!',
        createdAt: new Date(),
        id: genUUID(),
        title: 'From Electric',
        updatedAt: new Date(),
        userId: '1',
      },
    })
  }

  const clearItems = async () => {
    // await db.items.deleteMany()
  }

  const items: Post[] = results ?? []

  return (
    <div>
      <div className="controls">
        <button className="button" onClick={addItem}>
          Add
        </button>
        <button className="button" onClick={clearItems}>
          Clear
        </button>
      </div>
      {items.map((item: Post, index: number) => (
        <p key={index} className="item">
          <code>{item.id}</code>
          <code>{item.title}</code>
        </p>
      ))}
    </div>
  )
}
