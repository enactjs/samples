import Changeable from '@enact/ui/Changeable';
import Button from '@enact/moonstone/Button';
import {handle, forward, adaptEvent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import PropTypes, { number } from 'prop-types';
import React from 'react';

//Using the type keyword
type MyFunctionType = (count: number) => number;
interface counterProps {
    count? : number,
    onResetClick? : MyFunctionType,
    onCounterChange? : MyFunctionType,
    onDecrementClick? : MyFunctionType,
    onIncrementClick? : MyFunctionType
}

function createHandler(fn:MyFunctionType) {
    return handle(
        adaptEvent((ev, {count}) => ({
            type: 'onCounterChange',
            count: fn(count)
        }),
        forward('onCounterChange')
        )
    )
}

const CounterBase = kind<counterProps>({
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
        'onDecrementClick': createHandler(count => count - 1),
        'onIncrementClick': createHandler(count => count + 1),
        'onResetClick': createHandler(() => 0)
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

const Counter = Changeable({prop: 'count' , change: 'onCounterChange'}, CounterBase);

export default Counter;
export {
    CounterBase,
    Counter
};
