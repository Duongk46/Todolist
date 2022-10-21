import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import BodyContent from './Components/Todolist/BodyContent';
import BodyContact from './Components/Contact/BodyContact';
import TopMenu from './TopMenu';
function App() {
  return (
    <div className="App">
      <TopMenu />
      <Routes>
        <Route path="/" element={ <BodyContent />} />
        <Route path="/contact" element={<BodyContact />} />
      </Routes>
    </div>

  );
}

export default App;
