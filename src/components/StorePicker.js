import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    constructor() {
        super();
        this.goToStore = this.goToStore.bind(this);
    }

    myInput = React.createRef();

    goToStore(event) {
        // stop form from submitting
        event.preventDefault();
        // get the text from input 
        const storeName = this.myInput.current.value;
        // change the page to /store/whatever-they-entered
        this.props.history.push(`/store/${storeName}`);
    };

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>please entere a store</h2>
                <input
                    type="text"
                    ref={this.myInput}
                    required placeholder="store Name"
                    defaultValue={getFunName()}

                />
                <button type="submit">Visit store -> </button>
            </form>
        )
    }
}

export default StorePicker;
