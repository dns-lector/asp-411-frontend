import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Layout from '../../features/layout/Layout';
import Home from '../../pages/home/Home';

export default function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}
