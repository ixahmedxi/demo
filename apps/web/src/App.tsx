import { trpc } from './lib/trpc'

export function App() {
  const { data } = trpc.router0.greeting.useQuery({ who: 'world' })

  return <h1>{data ?? 'Loading...'}</h1>
}
