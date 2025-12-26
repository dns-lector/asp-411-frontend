import type IProduct from "../model/IProduct";

export default function ProductCard({product}:{product:IProduct}) {
    return <div className="col">
        <div className="card h-100 position-relative">
            <div className="position-absolute top-0 end-0 m-3 bg-secondary bg-opacity-25 rounded-circle text-light wh-2 center"><i className="bi bi-heart"></i></div>
            <a className="nav-link h-100" href="#!">
                <img src={product.imageUrl ?? undefined} className="card-img-top" alt={product.name}/>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="product-rating" title="Оцінка 4.8 @('\n')Відгуків: 123">★★★★★</div>
                </div>
            </a>
            <div className="card-footer d-flex justify-content-between align-items-center">
                <span>
                    ₴&thinsp;{product.price.toFixed(2)}
                </span>
                <button data-to-cart="@Model.Id" type="button" className="btn btn-outline-success">
                    <i className="bi bi-cart"></i>
                </button>
            </div>
        </div>
    </div>;
}