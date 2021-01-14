import './App.css';
import AttentionPanel from './component/attention/attention';
import Nav from './component/nav/nav';
import SearchPanel from './component/search/search'
import { MenuList } from './config'

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
        <div className='quotes'>quotes</div>
        <div className='comment'>comment</div>
      </main>
    </>
  );
}

export default App;
