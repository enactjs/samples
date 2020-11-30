import {Header, Panel} from '@enact/sandstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Repeater from '@enact/ui/Repeater';
import Scroller from '@enact/sandstone/Scroller';

import Kitten from '../components/Kitten';

const ListBase = kind({
    name: 'List',

    propTypes: {
        children: PropTypes.array,
        onSelectKitten: PropTypes.func
    },

    render: ({children, onSelectKitten, ...rest}) => (
        <Panel {...rest}>
            <Header title="Kittens!" />
            <Scroller>
                <Repeater childComponent={Kitten} indexProp="index" itemProps={{onSelect: onSelectKitten}}>
                    {children}
                </Repeater>
            </Scroller>
        </Panel>
    )
});

export default ListBase;
export {ListBase as List, ListBase};
