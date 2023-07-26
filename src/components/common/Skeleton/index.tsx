const Skeleton = (props: { max3perRow?: boolean }) => {
    return (
        <div
            className={
                props?.max3perRow
                    ? 'col-lg-4 col-md-6 col-sm-6'
                    : 'col-xl-3 col-lg-4 col-md-6 col-sm-6'
            }
        >
            <div className='skeleton-loader mb-50'>
                <div className='skeleton-block'></div>
                <div className='skeleton-block'></div>
                <div className='skeleton-block'></div>
            </div>
        </div>
    );
};

export default Skeleton;
