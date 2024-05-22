import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';
import './ExpenseItem.css'; // Import your CSS file for styling

const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });
    };

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'RED_EXPENSE',
            payload: expense,
        });
    };

    return (
        <tr>
            <td>{props.name}</td>
            <td>{currency}{props.cost}</td>
            <td>
                <button className="increase-button" onClick={() => increaseAllocation(props.name)}>
                    <span className="plus-icon">+</span>
                </button>
            </td>
            <td>
                <button className="decrease-button" onClick={() => decreaseAllocation(props.name)}>
                    <span className="minus-icon">-</span>
                </button>
            </td>
            <td>
                <TiDelete size='1.5em' onClick={handleDeleteExpense} />
            </td>
        </tr>
    );
};

export default ExpenseItem;
