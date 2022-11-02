import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTransaction, createTransaction } from '../features/transaction/transactionSlice';

const Form = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [editMode, setEditMOde] = useState(false);
    const dispatch = useDispatch();

    const {isLoading, isError, editing} = useSelector(state => state.transaction);
    //const editing = useSelector(state => state.editing);

    useEffect(() => {
        const {id, name, amount, type} = editing || {};
        if(id){
            setEditMOde(true);
            setName(name);
            setType(type);
            setAmount(amount);
        }
        else{
            setEditMOde(false);
            reset();
        }

    },[editing])

    const reset = () => {
        setName('');
        setType('');
        setAmount('');
    }

    const handleCreate = e => {
        e.preventDefault();
        dispatch(createTransaction({
            name, type, amount: Number(amount),
        }));

        reset();
    }

    const handleUpdate = e => {
        e.preventDefault();
        dispatch(changeTransaction({
            id: editing?.id,
            data: {
                name,
                amount,
                type
            }
        }));

        reset();
        setEditMOde(false);
    }

    const cancelEditMode = () => {
        setEditMOde(false);
        reset();
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={editMode ? handleUpdate : handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="enter title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label>Type</label>
                    <div className="radio_group">
                        <input
                            type="radio"
                            required
                            value="income"
                            name="type"
                            checked = {type === "income"}
                            onChange={() => setType("income")}
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            checked = {type === "expense"}
                            onChange={() => setType("expense")}
                        />
                        <label>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="amount"
                        required
                        placeholder="enter amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} className="btn" type='submit'>{editMode ? "Update Transaction" : "Add Transaction"}</button>
            </form>

            {
                editMode && <button className="btn cancel_edit" onClick={cancelEditMode}>Cancel Edit</button>
            }

            {
                !isLoading && isError && (<p className='error'>There was an error occurred </p>)
            }
        </div>
    );
};

export default Form;