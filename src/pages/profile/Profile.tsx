import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ui/Profile.css';
import AppContext from '../../features/context/AppContext';

export default function Profile() {
    const {user} = useContext(AppContext)!;
    const navigate = useNavigate();

    useEffect(() => {
        if(user == null) {
            navigate("/");
        }
    }, [user]);

    return <>
    <div className="text-center">
        <h1 className="display-4">Кабінет користувача</h1>
    </div>
    {user?.name}
    </>;
}
/*
Д.З. Реалізувати сторінку профіля (кабінету) користувача за аналогією з ASP.
За необхідності розширити інтерфейс IUser
З боку бекенда вилучити з даних, що передаються, парольну інформацію (salt, dk)
*/
