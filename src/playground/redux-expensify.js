import {createStore,combineReducers} from 'redux';
import uuid from 'uuid';


//SET_TEXT_FILTER
//SORT_BY_DATE
//SORT_BY_AMOUNT
//SET_START_DATE
//SET_END_DATE

const demoState = {
    expenses:[{
        id: '123',
        description: 'January Rent',
        note: 'This is the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters:{
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};

const expenseReducerDefaultState = [];
const expenseReducer = (state=expenseReducerDefaultState,action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [...expenses, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id );
        case 'EDIT_EXPENSE':
            return state.expenses.map((expense) => {
                if (expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    };
                }else {
                    return {exepnse};
                }
            });
        default:
            return state;
    }
};


const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state=filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default: return state;
    }
    
};


const getVisibleExpenses = (expenses,{text, sortBy,startDate, endDate}) =>{
    return expenses.filter ((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort ((a, b) =>{
        if (sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        }else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1: -1;
        }
    });
};


const store = createStore(
    combineReducers ({
        expenses: expenseReducer,
        filters: filtersReducer
    })
);

store.subscribe(()=>{
    console.log(store.getState());
});

store.dispatch(addExpense({description:'Rent',amount:100}));
store.dispatch(addExpense({description:'Coffee',amount:300}));
store.dispatch(removeExpense({id: state.expenses[0].id}));
