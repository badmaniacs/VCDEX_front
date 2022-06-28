import {Route, Routes} from 'react-router-dom';
import MakeChart from './components/MakeChart';
import Top from './pages/Top'
import About from './pages/About';
import Model from './pages/Model';
import Home from './pages/Home';
import Models from './components/Models';

const App = () => {

  return (
    <div>
      <Routes>
        <Route element={<Top/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/chart" element={<MakeChart/>}/>
          <Route path="/models/" element={<Models/>}>
            <Route path="/models/:name" element={<Model/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
