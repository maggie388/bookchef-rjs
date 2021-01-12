import React, { Component } from 'react';
import './SearchBar.scss';

class SearchBar extends Component {
    state = {
        query: '',
        filter: ''
    }

    handleChange = (e) => {
        if (e.target.name === 'query') {
            this.setState({
                [e.target.name]: e.target.value
            }, () => {
                this.props.search(this.state.query, this.state.filter);
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
            this.props.filter(e);
        }
    }


    render() {
        return (
            <div className='search-bar'>
                <input className='search-bar__input' 
                    type='text' 
                    name='query' 
                    value={this.state.query} 
                    onChange={this.handleChange}
                />
                <div className='search-bar__dropdown'>
                    <select
                        className='search-bar__select'
                        id='filter'
                        name='filter'
                        value={this.state.filter}
                        onChange={this.handleChange}
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
            </div>
        );
    }
}

export default SearchBar;