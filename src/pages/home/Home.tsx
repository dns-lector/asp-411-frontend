import { useEffect, useState } from "react";
import "./ui/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
    const [model, setModel] = useState<ShopIndexViewModel>({groups: []});

    useEffect(() => {
        fetch("https://localhost:7016/Shop/ApiIndex")
        .then(r => r.json())
        .then(setModel);
    }, []);

    return <>
    <div className="text-center">
        <h1 className="display-4">Крамниця</h1>
    </div>

    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 w-100">
      {model.groups.map(g => <GroupCard key={g.id} group={g} />)}
    </div>
    </>;
}

function GroupCard({group}:{group:Group}) {
    return <div className="col">
        <Link className="nav-link h-100" to={"/group/" + group.slug}>
            <div className="card h-100">
                <img 
                    src={group.imageUrl} 
                    className="card-img-top" 
                    alt={group.name}/>
                <div className="card-body">
                    <h5 className="card-title">{group.name}</h5>
                    <p className="card-text">{group.description}</p>
                </div>
            </div>
        </Link>
    </div>;
}

interface ShopIndexViewModel {
    groups: Array<Group>,
}

interface Group {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    slug: string,
    deleteAt: string,
    // products:
}