import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

//event simulation
test('test with invalid amount', ()=> {
    const value = '12.222';
    const wrapper = shallow (<ExpenseForm/>);
    wrapper.find('input').at(1).simulate('change', {target: {value}});
    expect(wrapper.state('amount')).toBe('');
});

// test spies
test('ensure onsubmit is called', ()=> {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow (<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate ('submit', {preventDefault: ()=>{}});
    expect (wrapper.state('error')).toBe('');
    expect (onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt

    });

});

// test using enzyme prop/props// this does not work since SingleDatePicker is not a root node.
test('test onDateChange', ()=>{
    const now = moment();
    const wrapper = shallow (<ExpenseForm/>);
    //wrapper.find ('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});