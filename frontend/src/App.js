import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import ReviewSubmitPage from './components/reviewPage/ReviewPage';
import ShowReviews from './components/showReview/ShowReviews';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={ReviewSubmitPage} />
        <Route path='/view-reviews' Component={ShowReviews} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
