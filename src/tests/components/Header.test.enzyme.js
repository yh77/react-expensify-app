import React from 'react';
import {shallow} from 'enzyme';
import Header from '../../components/Header';

test ('test header rendering', ()=>{
    const wrapper = shallow (<Header/>);
    expect (wrapper.find('h1').text()).toBe(1);
    expect (wrapper).toMatchSnapshot();
});