import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

    // initial state when first loaded
    // what does state look like before we add items to state - 
    state = {
        fishes: {},
        order: {}
    };

    // lifecycle methods 
    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate our localstorage 
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        console.log(localStorageRef);
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }


    // prevent data memory leaks
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }



    // custom made methods  
    // updating state of fishes object
    // methods that update state and state need to live in the same component
    addFish = (fish) => {
        // to UPDATE STATE we need to setstate
        // 1. take a copy of the existing state - never want to mutate the original state
        const fishes = { ...this.state.fishes };
        // 2. add our new fish to fish variable 
        fishes[`fish${Date.now()}`] = fish;
        // 3. set the new fishes object to state 
        this.setState({
            fishes: fishes
        });
    };

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
        // 2. update the state by removing 
        fishes[key] = null;
        // 3. upstate the state 
        this.setState({ fishes: fishes });
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };


    // update our order for fishes and quantity of fishes 
    addToOrder = (key) => {
        // 1.Take a copy of state 
        const order = { ...this.state.order };
        // 2. Either add to the order or update the number in our order
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
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">


                        {/* jsx does not have looping features so we need to have an array with .map or foreach */}
                        {/* loop through each fish in state      */}
                        {/* our state is an object, so we need to use object.keys */}
                        {/* each child in an array or iterator needs a unique key */}

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
