import {addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should test remove expense action', () => {
    const action = removeExpense ({id: '123abc'});
    expect (action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should test edit expense action', ()=>{
    const action = editExpense ('123abc', {note: 'new note'});
    expect (action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc', 
        updates:{note: 'new note'}
    });
});

test('should test add expense action object', ()=>{
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent'
    }
    const action = addExpense (expenseData);
    expect (action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {...expenseData,
        id: expect.any(String)
    }});
});
