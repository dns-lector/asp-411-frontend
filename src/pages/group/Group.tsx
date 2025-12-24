import { useParams } from 'react-router-dom';
import './ui/Group.css';

export default function Group() {
    const {slug} = useParams();

    return <>
    <div className="text-center">
        <h1 className="display-4">Розділ: {slug}</h1>
    </div>
    </>;
}
