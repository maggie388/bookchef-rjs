import React from 'react';
import './FilterBar.scss';

const FilterBar = ({ handleFilter }) => {
    return (
        <div className='filter-bar'>
            Filter: 
            <select
                className=''
                id='category'
                name='category'
                onChange={(e) => handleFilter(e)}
            >
                <option value=''>--</option>
                <option value='Main'>MAIN</option>
                <option value='Side Dish'>SIDE DISH</option>
                <option value='Dessert'>DESSERT</option>
                <option value='Breakfast'>BREAKFAST</option>
                <option value='Beverage'>BEVERAGE</option>
                <option value='Soup'>SOUP</option>
            </select>
        </div>
    );
};

export default FilterBar;