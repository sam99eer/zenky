import WishlistItem from 'src/components/pages/Wishlist/WishlistItem';

const WishlistData = () => {
    return (
        <div className='cart-main-area pt-95 pb-100'>
            <div className='container'>
                <div className='row'>
                    <div className='ms-auto me-auto col-lg-8 col-md-12 col-sm-12 col-12'>
                        <form action='#'>
                            <div className='table-content table-responsive cart-table-content'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Add To Cart</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <WishlistItem />
                                        <WishlistItem />
                                        <WishlistItem />
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistData;
