
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormMovie from './component/form';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<FormMovie/>}>

        </Route>
      </Routes>


      
    </Router>
  )
}

export default App
