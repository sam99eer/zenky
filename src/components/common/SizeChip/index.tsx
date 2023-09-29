import { IStock } from 'src/models/api/GetProductsModel';

const SizeChip = (props: {
    item: string;
    selectedSize: string | null;
    sizeHandler: (item: string) => void;
    stockData: IStock | undefined;
}) => {
    const stockQuantity = !!props?.stockData
        ? +props?.stockData?.quantity
        : null;

    return (
        <li
            key={props.item}
            className={`${props.selectedSize === props.item ? 'active' : ''}${
                stockQuantity === 0 ? 'out-of-stock' : ''
            }`}
        >
            <a
                onClick={
                    stockQuantity === 0
                        ? undefined
                        : props.sizeHandler.bind(this, props.item)
                }
            >
                <span
                    title={stockQuantity === 0 ? 'Out of Stock' : props.item}
                    className={`swatch-anchor ${
                        props.item === props.selectedSize ? 'text-active' : ''
                    }`}
                >
                    {props.item}
                </span>
            </a>
        </li>
    );
};

export default SizeChip;
