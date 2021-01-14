import './App.css';
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
        <div className='attention'>attention</div>
        <div className='info'>info</div>
        <div className='notice'>notice</div>
        <div className='quotes'>quotes</div>
        <div className='comment'>comment</div>
      </main>
    </>
  );
}

export default App;
