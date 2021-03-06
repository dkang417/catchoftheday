import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    // creating state here 
    // initial state when first loaded
    // what does state look like before we add items to state - 
    state = {
        fishes: {},
        order: {}
    };
    //state is the home and props is the car to get where it needs to be displayed

    // lifecycle methods 
    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate our localstorage  
        // add local storage order into state
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }


        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        // persisting order state with local storage
        // when order gets modified. our local storage gets updated
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }


    // prevent data memory leaks when going back from one store to homepage
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }


    // custom made method that takes a fish
    // updating state of fishes object
    // methods that update state and state need to live in the same component

    addFish = (fish) => {
        // to UPDATE STATE we need to setstate
        // 1. take a copy of the existing state - never want to reach into state and mutate the original state
        const fishes = { ...this.state.fishes };
        // 2. add our new fish to fish variable 
        fishes[`fish${Date.now()}`] = fish;
        // 3. set the new fishes object to state by calling method
        this.setState({
            fishes
        });
    };

    // addFish = (fish) => {
    //     const fishes = { ...this.state.fishes };
    //     fishes[`fish${Date.now()}`] = fish;
    //     this.setState({
    //         fishes: fishes
    //     });
    // }

    // for any changes made in Inventory fish state updates 
    updateFish = (key, updatedFish) => {
        // take a copy of current state 
        const fishes = { ...this.state.fishes };
        // update that state by using key
        fishes[key] = updatedFish;
        // set that to state 
        this.setState({ fishes: fishes });
    }

    deleteFish = (key) => {
        // 1. take a copy of state 
        const fishes = { ...this.state.fishes };
        // 2. update the state by removing an item from state
        // we are setting it to null because of firebase requirement 
        fishes[key] = null;
        // 3. update the state 
        this.setState({ fishes: fishes });
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };


    // update our (state) order for fishes and quantity of fishes 
    // pass in the (key) of our fish. fish1 fish2 fish3
    addToOrder = (key) => {
        // 1.Take a copy of state since we dont want to mutate
        const order = { ...this.state.order };
        // 2. Either add to the order or update the number in our order. 
        // if there is no fish in order, it will be 1
        order[key] = order[key] + 1 || 1;
        // 3.Call setstate to update our state object 
        this.setState({ order: order });
    }

    removeFromOrder = key => {
        // 1.take a copy of state 
        const order = { ...this.state.order };
        // 2. remove that item from the order
        delete order[key];
        // 3.Call setstate to update our state object 
        this.setState({ order: order });
    }



    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood" />

                    <ul className="fishes">

                        {Object.keys(this.state.fishes).map(key =>
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                            />)
                        }
                    </ul>

                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />

                {/* inventory passes down addfish and loadsamplefishes in props */}
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />

            </div>
        );
    }
}

export default App;
