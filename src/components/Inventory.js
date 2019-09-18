import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';


class Inventory extends React.Component {
    render() {
        return (
            <div className="Inventory">
                <h2> Inventory </h2>
                {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} fish={this.props.fishes[key]} updateFish={this.props.updateFish} />)}
                {/* inside props we have addfish and we pass it down again */}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}> Load Sample Fishes </button>
            </div>
        );
    }
}
export default Inventory;