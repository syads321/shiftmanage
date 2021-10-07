import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import DayShift from '../interfaces/day-shift'
import FetchtPost from '../helpers/fetchPost'
import { useDispatch } from 'react-redux'
import ShiftBoard from '../components/shift-board'
import { Button } from 'semantic-ui-react'
import AddDayModal from '../components/add-day-modal'
import EditShiftModal from '../components/edit-shift-modal'
const Home = ({ resp }: InferGetStaticPropsType<typeof getServerSideProps>) => {
  let list: Array<DayShift> = [];
  list = [...list, ...resp.data]
  const dispatch = useDispatch()
  dispatch({
    type: 'UPDATE_SHIFT',
    shifts: list
  })
  return (
    <div>
      <Head>
        <title>Shift Manager</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h1 className="ui center aligned header" style={{ marginTop: '1em' }}>Shift Manager</h1>
          <div className="ui text container right aligned"> <Button primary onClick={() => {
            dispatch({
              type: 'ADD_DAY',
              addDayMode: true
            })
          }}>Add day</Button></div>

        </div>
        <ShiftBoard />
      </main>
      <AddDayModal />
      <EditShiftModal />
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await FetchtPost(process.env.API_HOST + 'api/get-days', {})
  const resp = await res.json()
  // const resp = {
  //   data: []
  // }
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      resp,
    },
  }
}
