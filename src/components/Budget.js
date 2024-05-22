import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, currency, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    

    const handleBudgetChange = (event) => {
        setNewBudget(event.target.value);
        //updateBudget();
    };

    const updateBudget = () => {
        const totalSpending = expenses.reduce((total, item) => {
            return total + item.cost;
        }, 0);

        if (newBudget < totalSpending) {
            alert(`Budget cannot be lower than total spending (${currency}${totalSpending}).`);
            return;
        }

        if (newBudget > 20000) {
            alert(`Budget cannot exceed ${currency}20,000.`);
            return;
        }

        dispatch({
            type: 'SET_BUDGET',
            payload: parseInt(newBudget),
        });
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}</span>
            <input
                type="number"
                step="10"
                max="20000"
                value={newBudget}
                onChange={handleBudgetChange}
                onBlur={updateBudget}
                style={{ marginLeft: '1rem' }}
            />
        </div>
    );
};

export default Budget;
