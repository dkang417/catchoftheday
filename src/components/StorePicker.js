// always need to import React 
import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';


class StorePicker extends React.Component {
    static propTypes = {
        history: PropTypes.object
    };

    // this is creating the ref - on our input component
    // ref={this.myInput} 
    myInput = React.createRef();

    // binding this.  not binding will cause this to be undefined 
    // constructor() {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }

    // another solution is using an arrow function  
    goToStore = (event) => {
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

// always export what you want
export default StorePicker;
