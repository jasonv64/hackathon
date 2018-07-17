import React, { Component } from 'react';
import OutPut from './Output'

class OutPutFormat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.searchItem.length != 0) {
            return (
                <div className="formated-output">
                    <OutPut
                        searchItem={this.props.searchItem}
                    />
                </div>
            )
        } else {
            return (
                <div className="default-output">
                <label className="awesomeness">
                    Awesomeness awaits
                </label>
            <div className="stuff">
                    </div>
                </div>
            )
        }

    }
}

export default OutPutFormat;