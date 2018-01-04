import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';

test ('test header rendering', ()=>{
    const renderer = new ReactShallowRenderer();
    renderer.render (<Header/>);
    expect (renderer.getRenderOutput()).toMatchSnapshot();
    //console.log (renderer.getRenderOutput());
});