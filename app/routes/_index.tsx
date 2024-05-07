import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

const Home = () => {
  return (
    <>
      <h1>Hello, world!</h1>
    </>
  )
}

export default Home
