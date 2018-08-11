import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { nhssAction } from './actions/nhssAction'
import { nhssChangeValue } from './actions/nhssAction'
import logo from './logo.svg';
import Home from './Home';
import Post from './Post';
import './App.css';

const mapStateToProps = state => {
  return { ...state.nhssReducer.items };
};

const mapDispatchToProps = dispatch => ({
 nhssAction: (value) => dispatch(nhssAction(value)),
 nhssChangeValue: (item_index, new_value) => dispatch(nhssChangeValue(item_index, new_value))
})

class App extends Component {
	constructor() {
    super();
    this.onBtnClick = this.onBtnClick.bind(this);
    this.onBtnClick2 = this.onBtnClick2.bind(this);
  }

  onBtnClick(event) {
 		this.props.nhssAction("Amit Kumar");
	}

	onBtnClick2(event) {
 		this.props.nhssChangeValue(0, 34323);
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<header className="App-header">
						<Link to="/">
							<img src={logo} className="App-logo" alt="logo" />
						</Link>
						<h1 className="App-title">Welcome to React</h1>
						<Link to="/">Home</Link>
						<Link to="/post/">Post</Link>
						<button onClick={this.onBtnClick}>Test redux action</button>
						<button onClick={this.onBtnClick2}>Test redux action</button>

						<pre>
						{
							JSON.stringify(this.props)
						}
						</pre>

					</header>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/post/" component={Post} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
