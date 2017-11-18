import React from 'react';
import ReactDOM from 'react-dom';

require('../../../less/main.less');

class Main extends React.Component {
	render() {
		return (
			<div className="what">
				what is this
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('app'));
