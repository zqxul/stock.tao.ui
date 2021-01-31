import './App.css';
import React from 'react'
import AttentionPanel from './component/attention/attention';
import Nav from './component/nav/nav';
import SearchPanel from './component/search/search'
import { MenuList } from './config'
import LivingVideo from './component/media/living'
import Call from './component/media/call';
import CallPanel from './component/media/call';
import LandingPanel from './component/panel'
import { connect } from "react-redux";

const mapState = (state, ownProps) => {
  const { user } = state
  return { user: user }
}

export class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() { }

  render() {
    const { info } = this.props
    return info === undefined || info === null ?
      <div className='landing'><LandingPanel /></div> :
      <>
        <Nav menus={MenuList} size='lg' />
        <main>
          <header>
            header
          </header>
          <SearchPanel />
          <AttentionPanel />
          <div className='info'>info</div>
          <div className='notice'>notice</div>
          <div className='quotes'>
            <CallPanel />
          </div>
          <div className='comment'>comment</div>
        </main>
      </>
  }
}

export default connect(mapState, null)(App)

