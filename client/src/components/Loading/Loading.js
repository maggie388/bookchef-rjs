import React from 'react';
import './Loading.scss';

const Loading = () => {
    return (
        <main className='loading'>
            {/* <img className='loading__image' src={cutleryIcon} alt='loading' /> */}
            <div className='loading__container'>
                <div className='loading__shape loading__shape--1'></div>
                <div className='loading__shape loading__shape--2'></div>
                <div className='loading__shape loading__shape--3'></div>
            </div>
        </main>
    );
};

export default Loading;