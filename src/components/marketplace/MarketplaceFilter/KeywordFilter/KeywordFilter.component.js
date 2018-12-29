/*
Core Libs
*/
import React from 'react';
/*
Local CSS
*/
import './KeywordFilter.component.css';


class KeywordFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: ''
        }
    }

    render() {
        let { searchKeyword } = this.state;
        const { onChange } = this.props;

        return (
            <div className="keyword-search-box">
                <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => this.setState({searchKeyword: e.target.value})}
                />
                <button
                    className="search-btn"
                    onClick={() => onChange(searchKeyword)}
                >
                    <i className="material-icons">search</i>
                </button>
            </div>
        );
    }
}

export default KeywordFilter;
