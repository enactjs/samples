import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';


interface countableStateProps {
    count : number,
}

class Counter extends React.Component < {}, countableStateProps> {
    state : countableStateProps = {
        count: 0
    };
    increment = () => this.setState({count: this.state.count + 1})
    decrement = () => this.setState({count: this.state.count - 1})
    reset = () => this.setState({count: 0})

    render () {
        return(

            //Just render the component ? Do we need CounterBase
            // <div>
            //     <h1>{this.state.count}</h1>
            //     <Button onClick={this.decrement}>Decrement --</Button>
            //     <Button onClick={this.reset}>Reset</Button>
            //     <Button onClick={this.increment}>Increment ++</Button>
            // </div>
            
            //pass the props to CounterBase 
            <CounterBase onIncrementClick={this.increment} />



        )
    }

}

const CounterBase = kind({
	name: 'Counter',

	propTypes: {
        onIncrementClick: PropTypes.func.isRequired,
        onDecrementClick: PropTypes.func.isRequired,
        onResetClick: PropTypes.func.isRequired,
        count: PropTypes.number,
	},

	defaultProps: {
        count: 0
    },

	render: ({onIncrementClick, onDecrementClick, onResetClick, count}) => (
        <div>
            <h1>{count}</h1>
            <Button onClick={onDecrementClick}>Decrement --</Button>
            <Button onClick={onResetClick}>Reset</Button>
            <Button onClick={onIncrementClick}>Increment ++</Button>
        </div>

        //OR render Component Counter with props
	)
});

export default CounterBase;
export {
    Counter,
    CounterBase
};
