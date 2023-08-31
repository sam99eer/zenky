import { TrackingData } from 'src/models/api/OrderDetailsModel';

const TrackingInfo = (props: { data?: TrackingData }) => {
    return (
        <div className='faq-wrap'>
            <h2>Tracking Details</h2>
            <div className='row'>
                <div className='col-lg-6 col-md-6'>
                    <div className='single-faq-wrap mb-50'>
                        {props?.data?.tracking_data?.track_status === 0 ? (
                            <h3>This order has not been shipped yet!</h3>
                        ) : (
                            <>
                                <h3>Do you ship worldwide?</h3>
                                <p>
                                    This is the third article of a three-part
                                    series. I’m illustrating the marketing
                                    challenges of PrescottWeddings.com, a small
                                    business. If you don’t remember anything
                                    else about marketing, remember this:
                                    Frequency is king.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackingInfo;
