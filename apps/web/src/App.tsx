import { trpc } from './lib/trpc'

export function App() {
  const { data } = trpc.greeting.hello.useQuery()

  return <h1>{data ?? 'Loading...'}</h1>
}
