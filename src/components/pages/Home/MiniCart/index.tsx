import { IToggle } from 'src/models/screens/Home';

const MiniCart = (props: {
    isVisible: boolean;
    closeHandler: (uid: keyof IToggle) => void;
}) => {
    return (
        <div
            className={`sidebar-cart-active ${props.isVisible ? 'inside' : ''}`}
        >
            <div className='sidebar-cart-all'>
                <a
                    className='cart-close'
                    onClick={props.closeHandler.bind(this, 'cart')}
                >
                    <i className=' ti-close'></i>
                </a>
                <div className='cart-content'>
                    <h3>Shopping Cart</h3>
                    <ul>
                        <li className='single-product-cart'>
                            <div className='cart-img'>
                                <a href='#'>
                                    {/* <img src="assets/images/cart/cart-1.jpg" alt=""> */}
                                </a>
                            </div>
                            <div className='cart-title'>
                                <h4>
                                    <a href='#'>High Collar Jacket</a>
                                </h4>
                                <span>1 × $50.00</span>
                            </div>
                            <div className='cart-delete'>
                                <a href='#'>×</a>
                            </div>
                        </li>
                        <li className='single-product-cart'>
                            <div className='cart-img'>
                                <a href='#'>
                                    {/* <img src="assets/images/cart/cart-2.jpg" alt=""> */}
                                </a>
                            </div>
                            <div className='cart-title'>
                                <h4>
                                    <a href='#'>Long shirt dress</a>
                                </h4>
                                <span>2 × $29.00</span>
                            </div>
                            <div className='cart-delete'>
                                <a href='#'>×</a>
                            </div>
                        </li>
                    </ul>
                    <div className='cart-total'>
                        <h4>
                            Subtotal: <span>$150.00</span>
                        </h4>
                    </div>
                    <div className='cart-checkout-btn'>
                        <a
                            className='btn-hover cart-btn-style'
                            href='cart.html'
                        >
                            view cart
                        </a>
                        <a
                            className='no-mrg btn-hover cart-btn-style'
                            href='checkout.html'
                        >
                            checkout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniCart;
