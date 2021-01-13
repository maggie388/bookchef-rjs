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
            const filterBy = e.target.value;
            this.setState({
                [e.target.name]: filterBy
            })
            this.props.filterRecipes(this.state.query, filterBy);
        }
    }

    clear = () => {
        this.props.reset();
        this.setState({
            query: '',
            filter: ''
        })
        this.props.search('', '');
    }


    render() {
        const renderClearButton = () => {
            return (
                <div className='search-bar__clear'>
                    <p onClick={this.clear}>clear search results</p>
                </div>
            )
        }
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
                        <option value='Appetizer'>APPETIZER</option>
                        <option value='Beverage'>BEVERAGE</option>
                        <option value='Breakfast'>BREAKFAST</option>
                        <option value='Dessert'>DESSERT</option>
                        <option value='Dinner'>DINNER</option>
                        <option value='Lunch'>LUNCH</option>
                        <option value='Main'>MAIN</option>
                        <option value='Side Dish'>SIDE DISH</option>
                        <option value='Soup'>SOUP</option>
                    </select>
                </div>
                {this.state.query || this.state.filter ? renderClearButton() : ''}
            </div>
        );
    }
}

export default SearchBar;