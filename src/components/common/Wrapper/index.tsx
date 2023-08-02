import { ReactNode, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { GetCategories } from 'src/api/GetCategories';
import { IStoreModel } from 'src/store';
import { categoriesSliceAction, homeSliceActions } from 'src/store/Actions';
import { Keys } from 'src/utils/Keys';

const Wrapper = (props: { children: ReactNode }) => {
    const isBackdropVisible = useSelector(
        (state: IStoreModel) => state.homeReducer.backdropVisible
    );

    const categoryData = useSelector(
        (state: IStoreModel) => state.categoryReducer.data
    );
    const dispatch = useDispatch();

    useQuery(Keys.CATEGORIES, GetCategories, {
        enabled:
            categoryData.MEN.length < 1 &&
            categoryData.WOMEN.length < 1 &&
            categoryData.KIDS.length < 1,
        onSuccess: (data) => {
            dispatch(categoriesSliceAction.fillData({ data: data.data }));
        },
    });

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
