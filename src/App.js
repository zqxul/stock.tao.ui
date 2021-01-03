import './App.css';
import Nav from './component/nav/nav';
import { MenuList } from './config'

function App() {
  return (
    <>
    <Nav menus={MenuList} />
    <main>
      <header>
        header
        {/* <div>
          上证指数
        </div>
        <div>
          深证指数
        </div>
        <div>
          香港指数
        </div> */}
      </header>
      <div className='search'>search</div>
      <div className='attention'>attention</div>
      <div className='recommend'>recommend</div>
      <div className='info'>info</div>
      <div className='notice'>notice</div>
      <div className='quotes'>quotes</div>
      <div className='comment'>comment</div>
    </main>
    </>
  );
}

export default App;
