import React from 'react';
import Logo from './images/logo.png';
export default class Root extends React.Component {
	render() {
		return (
			<div style = {{textAlign: 'center'}}>
				<img src={ Logo } alt='money'/>
				<h1>Hello China!!</h1>
			</div>);
	}
}