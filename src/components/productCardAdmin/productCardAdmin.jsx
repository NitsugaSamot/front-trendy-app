
const ProductCardAdmin = ({product})=>{

    return (
        <div>
            <h2>{product.id}</h2>
            <h2>{product.name}</h2>
            <h2>{product.brand}</h2>
            <h2>{product.price}</h2>
            <h2>{product.stock.s.blanco}</h2>
            <h2>{product.stock.s.negro}</h2>
            <h2>{product.stock.s.gris}</h2>
            <h2>{product.stock.m.blanco}</h2>
            <h2>{product.stock.m.negro}</h2>
            <h2>{product.stock.m.gris}</h2>
            <h2>{product.stock.l.blanco}</h2>
            <h2>{product.stock.l.negro}</h2>
            <h2>{product.stock.l.gris}</h2>
            <h2>{product.stock.xl.blanco}</h2>
            <h2>{product.stock.xl.negro}</h2>
            <h2>{product.stock.xl.gris}</h2>
        </div>
    )
}

export default ProductCardAdmin