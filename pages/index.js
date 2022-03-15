import Head from 'components/Common/MetaHead'
import Homepage from 'components/Page/Home'

export default function Home() {
  return (
    <>
      <Head
        title="Home"
        desc="this is description of wellings"
        keyword="wellings"
        url="/"
      />
      <Homepage />
    </>
  )
}
