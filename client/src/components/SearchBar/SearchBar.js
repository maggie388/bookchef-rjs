import React, { Component } from 'react';
import './SearchBar.scss';

// ASSETS

class SearchBar extends Component {
    state = {
        query: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.props.search(this.state.query);
        });
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
            </div>
        );
    }
}

export default SearchBar;