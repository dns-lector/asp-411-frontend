import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import type IUser from '../../entities/user/model/IUser';
import AppContext from '../../features/context/AppContext';
import Layout     from '../../features/layout/Layout';
import Group      from '../../pages/group/Group';
import Home       from '../../pages/home/Home';
import NotFound   from '../../pages/not_found/NotFound';
import Profile    from '../../pages/profile/Profile';

export default function App() {
  const [user, setUser] = useState<IUser|null>(null);

  return <AppContext.Provider value={{user, setUser}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='group/:slug' element={<Group />} />
          <Route path='profile' element={<Profile />} />

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppContext.Provider>;
}
