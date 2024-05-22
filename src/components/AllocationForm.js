import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = () => {
    const { currency, dispatch, remaining } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('Add');

    const submitEvent = (event) => {
        event.preventDefault();

        if (!name) {
            alert("Please select a department.");
            return;
        }

        if (!cost || isNaN(cost) || cost <= 0) {
            alert("Please enter a valid cost.");
            return;
        }

        if (parseInt(cost) > remaining) {
            alert("The value cannot exceed remaining funds £" + remaining);
            setCost('');
            return;
        }

        const expense = {
            name,
            cost: parseInt(cost),
        };

        if (action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }

        // Clear the form after submission
        setName('');
        setCost('');
        setAction('Add');
    };

    return (
        <form onSubmit={submitEvent}>
            <div className='row'>
                <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" value={name} onChange={(event) => setName(event.target.value)}>
                        <option value="">Choose...</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" value={action} onChange={(event) => setAction(event.target.value)} style={{ marginRight: '3rem' }}>
                        <option value="Add">Add</option>
                        <option value="Reduce">Reduce</option>
                    </select>
                    {currency}
                    <input
                        required
                        type='number'
                        id='cost'
                        value={cost}
                        style={{ marginLeft: '2rem' }}
                        onChange={(event) => setCost(event.target.value)}
                    />

                    <button type="submit" className="btn btn-primary" style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AllocationForm;
