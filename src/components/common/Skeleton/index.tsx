const Skeleton = () => {
    return (
        <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6'>
            <div className='skeleton-loader'>
                <div className='skeleton-block'></div>
                <div className='skeleton-block'></div>
                <div className='skeleton-block'></div>
            </div>
        </div>
    );
};

export default Skeleton;
