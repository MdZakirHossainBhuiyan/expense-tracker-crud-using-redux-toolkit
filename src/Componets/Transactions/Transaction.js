import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { editActive, removeTransaction } from '../../features/transaction/transactionSlice';
import numberWithCommas from '../../utils/numberWithCommas';

const Transaction = ({transaction}) => {
    const {name, amount, type, id} = transaction || {};
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(editActive(transaction))
    }

    const handleDelete = () => {
        dispatch(removeTransaction(id))
    }

    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {numberWithCommas(amount)}</p>
                <button onClick={handleEdit} className="link">
                    <EditIcon />
                </button>
                <button onClick={handleDelete} className="link">
                    <DeleteOutlineIcon />
                </button>
            </div>
        </li>
    );
};

export default Transaction;