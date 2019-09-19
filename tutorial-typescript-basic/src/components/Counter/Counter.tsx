import Changeable from '@enact/ui/Changeable';
import Button from '@enact/moonstone/Button';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

interface countableStateProps {
    count : number,
}

const CounterBase = kind<countableStateProps>({
	name: 'Counter',

	propTypes: {
        count: PropTypes.number,
        onCounterChange: PropTypes.func,
        onIncrementClick: PropTypes.func,
        onDecrementClick: PropTypes.func,
        onResetClick: PropTypes.func
	},

	defaultProps: {
        count: 0
    },

    handlers: {
        // @ts-ignore
        onDecrementClick: (ev, {count, onCounterChange}) => {
            onCounterChange({count: count - 1});
        },
        // @ts-ignore
        onResetClick: (ev, {count, onCounterChange}) => {
            onCounterChange({count: 0});
        },
        // @ts-ignore
        onIncrementClick: (ev, {count, onCounterChange}) => {
            onCounterChange({count: count + 1});
        }
	},

	render: ({onIncrementClick, onDecrementClick, onResetClick, count, ...rest}) => (
        <div>
            <h1>{count}</h1>
            <Button onClick={onDecrementClick}>Decrement --</Button>
            <Button onClick={onResetClick}>Reset</Button>
            <Button onClick={onIncrementClick}>Increment ++</Button>
        </div>
	)
});

// @ts-ignore
const Counter = Changeable({prop: 'count' , change: 'onCounterChange'});

export default CounterBase;
export {
    CounterBase,
    Counter
};
