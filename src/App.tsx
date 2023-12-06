import { Routes, Route } from 'react-router-dom';

// Pages
import Homepage from './pages/Homepage';
import Favorite from './pages/Favoritepage';
import { ConstRoutes } from './constants/routes';
import Layout from './component/Layout';
import PopUps from './component/PopUps';


const App = () => {
  return (
    <Layout>
      <PopUps />
      <Routes>
        <Route path={ConstRoutes.HOMEPAGE} element={<Homepage />} />
        <Route path={ConstRoutes.FAVORITES} element={<Favorite />} />
      </Routes>
    </Layout>
  );
}
export default App;
