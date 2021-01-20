import './App.css';
import AttentionPanel from './component/attention/attention';
import Nav from './component/nav/nav';
import SearchPanel from './component/search/search'
import { MenuList } from './config'
import LivingVideo from './component/media/living'
import Call from './component/media/call';
import CallPanel from './component/media/call';

function App() {
  return (
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
  );
}

export default App;
