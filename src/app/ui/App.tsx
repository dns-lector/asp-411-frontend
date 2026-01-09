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

  const request = (url:string, init?: RequestInit, isFullRest?:boolean) => new Promise(
    (resolve, reject) => {

      if(url.startsWith("api://")) {
        url = url.replace("api://", "https://localhost:7016/");
      }

      fetch(url, init)
      .then(r => {   // REST - завжди має передавати JSON
        if (r.status !== 200) {   // REST - HTTP статус має бути тільки 200
          r.text().then(reject);
        }
        else {
          const ct = r.headers.get("Content-Type");    // application/json; charset=utf-8
          if(!/^application\/json(; .+)?$/.test(ct ?? "")) {
            reject("Unsupported Content-Type: " + ct);
          }
          else {
            r.json().then(j => {
              // слід перевірити j.status.isOk
              // якщо він не позитивний, то викликати reject(j)
              // !! але якщо не зазначено isFullRest, тоді просто викликаємо resolve(j)
              resolve(isFullRest ? j : j.data);   // REST - дані завжди у полі .data
            });
          }
          // console.log();
        }        
      });      

    }
  );

  return <AppContext.Provider value={{user, setUser, request}}>
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
