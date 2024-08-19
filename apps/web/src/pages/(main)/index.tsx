import { useShape } from '@electric-sql/react'

export const Component = () => {
  return <Example />
}

const Example = () => {
  const { data } = useShape({
    url: `http://arch.local:13000/v1/shape/foo`,
  })

  return <pre>{JSON.stringify(data, null, 4)}</pre>
}
