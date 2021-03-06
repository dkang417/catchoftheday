import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';


class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    };
    // when we load page, firebase will check for logged in user
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        })
    }

    // once someone signs in 
    authHandler = async authData => {
        console.log(authData);
        // 1- look up the current store in firebase database
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log(store);
        // 2- claim it if no owner 
        if (!store.owner) {
            // save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        // 3- set the state of the inventory component to reflect current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    }

    authenticate = provider => {
        // const authProvider = new firebase.auth.GithubAuthProvider();
        // needs to be dynamic for github and twitter
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        // console.log('logging out');
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>
        // 1. check if they are logged in 
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }
        // 2. check if they are the owner of the store
        if (this.state.uid !== this.state.owner) {
            return <div>
                <p> Sorry you are not the owner </p>
                {logout}
            </div>
        }
        // 3. they must be the onwer, just render inventory 
        return (
            <div className="Inventory">
                <h2> Inventory </h2>
                {logout}
                {Object.keys(this.props.fishes).map(key =>
                    <EditFishForm
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                    />)}
                {/* inside props we have addfish and we pass it down again */}
                <AddFishForm addFish={this.props.addFish} />

                {/*  passed in through props from app.js */}
                <button onClick={this.props.loadSampleFishes}> Load Sample Fishes </button>
            </div>
        );
    }
}
export default Inventory;