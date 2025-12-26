import { useParams } from 'react-router-dom';
import './ui/Group.css';
import { useEffect, useState } from 'react';
import type IGroup from '../../entities/group/model/IGroup';
import ProductCard from '../../entities/product/ui/ProductCard';

export default function Group() {
    const {slug} = useParams();
    const [group, setGroup] = useState<IGroup|null>(null);

    useEffect(() => {
        fetch("https://localhost:7016/Shop/ApiGroup/" + slug)
        .then(r => r.json())
        .then(j => setGroup(j.data));
    }, [slug]);

    return <div className="text-center">
        <h1 className="display-4">Розділ: {group?.name}</h1>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {group?.products.map(p => <ProductCard product={p} key={p.id} />)}
        </div>
        

    </div>;
}
/*
Д.З. Завершити розмітку зроблених сторінок фронтенду:
домашня сторінка,
сторінка товарної групи.
*/