import { TrackingData } from 'src/models/api/OrderDetailsModel';

const TrackingInfo = (props: { data?: TrackingData }) => {
    return (
        <div className='faq-wrap'>
            <h2>Tracking Details</h2>
            <div className='row'>
                {props?.data?.tracking_data?.track_status === 0 ? (
                    <div className='col-12 col-lg-6 col-md-6'>
                        <div className='single-faq-wrap mb-50'>
                            <h3>This order has not been shipped yet!</h3>
                        </div>
                    </div>
                ) : null}

                {props?.data?.tracking_data?.track_status === 1 ? (
                    <div className='col-12'>
                        <div className='single-faq-wrap mb-50'>
                            <h4>
                                AWB Number:{' '}
                                <a
                                    href={props?.data?.tracking_data?.track_url}
                                    target='_blank'
                                >
                                    {
                                        props?.data?.tracking_data
                                            ?.shipment_track?.[0]?.awb_code
                                    }
                                </a>
                            </h4>
                            <h4>
                                Courier Via:{' '}
                                {
                                    props?.data?.tracking_data
                                        ?.shipment_track?.[0]?.courier_name
                                }
                            </h4>
                            <div className='myaccount-table table-responsive text-center'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Activity</th>
                                            <th>Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props?.data?.tracking_data?.shipment_track_activities?.map(
                                            (item) => (
                                                <tr key={item?.date}>
                                                    <td>{item?.date}</td>
                                                    <td>{item?.activity}</td>
                                                    <td>{item?.location}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default TrackingInfo;
