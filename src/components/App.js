import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';


class App extends React.Component {
    // initial state when first loaded
    state = {
        fishes: {},
        order: {}
    };
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


    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order />
                {/* inventory passes down addfish in props */}
                <Inventory addFish={this.addFish} />

            </div>
        );
    }
}

export default App;
