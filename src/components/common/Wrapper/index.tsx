import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreModel } from 'src/store';
import { homeSliceActions } from 'src/store/Actions';

const Wrapper = (props: { children: ReactNode }) => {
    const isBackdropVisible = useSelector(
        (state: IStoreModel) => state.homeReducer.backdropVisible
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (isBackdropVisible) {
            dispatch(homeSliceActions.turnOffBackdrop());
        }
    }, []);

    return (
        <div
            className={`main-wrapper main-wrapper-2 ${
                isBackdropVisible ? 'overlay-active' : ''
            }`}
        >
            {props.children}
        </div>
    );
};

export default Wrapper;
