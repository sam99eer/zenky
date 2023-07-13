const WishlistItem = () => {
    return (
        <tr>
            <td className='product-remove'>
                <a href='#'>
                    <i className=' ti-close'></i>
                </a>
            </td>
            <td className='product-img'>
                <a href='#'>
                    <img src='assets/images/cart/cart-3.jpg' alt='' />
                </a>
            </td>
            <td className='product-name'>
                <a href='#'>High Collar Jacket</a>
            </td>
            <td className='product-price'>
                <span className='amount'>$26.00</span>
            </td>
            <td className='cart-quality'>
                <div className='quickview-quality quality-height-dec2'>
                    <div className='cart-plus-minus'>
                        <input
                            className='cart-plus-minus-box'
                            type='text'
                            name='qtybutton'
                            value='2'
                        />
                    </div>
                </div>
            </td>
            <td className='product-wishlist-cart'>
                <a href='#'>add to cart</a>
            </td>
        </tr>
    );
};

export default WishlistItem;
