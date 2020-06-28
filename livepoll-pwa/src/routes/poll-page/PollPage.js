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

  const displayVoterList = useMemo(() => {
    return function (itemId) {
      console.log('XXXXXXXXXXXXXXXx')
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
      <Responsive screens={['M', 'L']}>
        <div className="content multiSection">
          <div style={{flexGrow: 1}}>
            {pollHeader}
            {itemsPanel}
          </div>

          <div style={{width: '40%'}}>
            &nbsp;XXXXX
          </div>
        </div>
      </Responsive>

      <Responsive screens={['S']}>
        <div className="content">
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
