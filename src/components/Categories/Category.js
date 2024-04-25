const Category = ({product, onShop}) => {
    return <img src={product} onClick={onShop} alt="category"/>
}

export default Category;