import Changeable from '@enact/ui/Changeable';
import Button from '@enact/moonstone/Button';
import {handle, forward, adaptEvent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import PropTypes, { number } from 'prop-types';
import React from 'react';

interface CounterProps {
    count? : number,
    onCounterChange? : void
}

type handlerFunctionType = (count: number) => number;

function createHandler(fn:handlerFunctionType) {
    return handle(
        adaptEvent((ev, {count}) => ({
            type: 'onCounterChange',
            count: fn(count)
        }),
        forward('onCounterChange')
        )
    )
}

const CounterBase = kind<CounterProps>({
	name: 'Counter',

	defaultProps: {
        count: 0
    },

    handlers: {
        onDecrementClick: createHandler(count => count - 1),
        onIncrementClick: createHandler(count => count + 1),
        onResetClick: createHandler(() => 0)
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
