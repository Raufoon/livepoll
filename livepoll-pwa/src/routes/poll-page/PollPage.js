import React, {useState, lazy, Suspense, useMemo} from 'react'
import {useParams, useRouteMatch, Switch, Route} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import usePollDetails from './hooks/usePollDetails'
import usePollItems from './hooks/usePollitems'
import ItemsPanel from './components/items-panel/ItemsPanel'
import PollHeader from './components/poll-header/PollHeader'
import useModal from '../../components/modal/hooks/useModal'
import Modal from '../../components/modal/Modal'
import { actionFetchVoterList } from '../../state-management/actions/poll-actions'
import Responsive from '../../components/responsive/Responsive'
import './style.css'
import useHomeData from '../home-page/hooks/useHomeData'
import PollCard from '../../components/poll-card/PollCard'

const NavHeader = lazy(() => import('./components/poll-nav-header/PollNavHeader'))
const VoterList = lazy(() => import('./components/voter-list/VoterList'))

export default function PollPage () {
  console.log('Rendering PollPage')

  const [votersVisible, showVotersModal, hideVotersModal] = useModal()
  const [itemIdForVoterList, setItemIdForVoterList] = useState(false)
  
  const {id} = useParams()
  const pollDetails = usePollDetails(id)
  const pollItems = usePollItems(id)
  const dispath = useDispatch()
  const match = useRouteMatch()
  const [recentPolls] = useHomeData()
  
  const similarPolls = (
    Object.values(recentPolls).map(function(poll) {
      return <PollCard className='pollCard' key={poll.id} {...poll}/>
    })
  )

  const displayVoterList = useMemo(() => {
    return function (itemId) {
      showVotersModal()
      dispath(actionFetchVoterList(id, itemId))
      setItemIdForVoterList(itemId)
    } 
  }, [dispath, id, showVotersModal])

  const hideVoterList = useMemo(() => {
    return function (itemId) {
      hideVotersModal()
      setItemIdForVoterList(false)
    } 
  }, [hideVotersModal])

  if (!pollDetails) return "Loading..."
  
  // view elements
  const pollHeader = <PollHeader pollId={id}/>

  const itemsPanel = pollItems && <ItemsPanel
    className='itemsPanel'
    pollId={id}
    displayVoterList={displayVoterList}
    items={Object.values(pollItems)}/>
  
  return (
    <div className='PollPage'>
      <Responsive minWidth={1450}>
        <div className='poll'>
          <div className="inner">
            {pollHeader}
            {itemsPanel}
          </div>
        </div>

        <div className="similarPollSection">
          <div className="sectionLabel">SIMILAR POLLS</div>
          <div className="content">
            {similarPolls}
          </div>
        </div>
      </Responsive>

      <Responsive maxWidth={1449}>
        <div className="poll mobile">
          {pollHeader}
          <NavHeader/>
          <Suspense fallback="Loading items...">
            <Switch>
              <Route exact path={`${match.path}/more`} render={() => "more"}/>
              <Route exact path={`${match.path}/about`} render={() => "about"}/>
              <Route exact path={`${match.path}/`} render={() => itemsPanel}/>
            </Switch>
          </Suspense>
        </div>
      </Responsive>

      <Modal isOpen={votersVisible} onClose={hideVoterList}>
        {itemIdForVoterList && <VoterList pollId={id} itemId={itemIdForVoterList}/>}
      </Modal>
    </div>
  )  
}
