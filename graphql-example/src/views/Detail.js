import {Header, Panel} from '@enact/moonstone/Panels';
import Image from '@enact/moonstone/Image';
import {Column} from '@enact/ui/Layout';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import List from '../components/list';

const GET_USER = gql`
  query($login: String!) {
    user(login: $login) {
      name
      avatarUrl
      organizations(first: 10) {
        nodes {
          name
        }
      }
      repositories(first: 10) {
        nodes {
          name
          url
        }
      }
      followers(first: 10) {
        nodes {
          name
        }
      }
    }
  }
`;

const DetailBase = kind({
	name: 'Detail',

	propTypes: {
		lists: PropTypes.object,
		userId: PropTypes.string
	},

	render: ({userId, lists, ...rest}) => (
		<Query query={GET_USER} variables={{login: userId}}>
			{({loading, data}) => {
				if (loading) {
					return (<Panel {...rest}><p>Loading...</p></Panel>);
				} else if (!data && !data.user) {
					return <Panel {...rest}><p>User not found...</p></Panel>;
				} else {
					return (<Panel {...rest}>
						<Header type="compact" title={data.user.name}>
							<Image src={data.user.avatarUrl} style={{height: '3rem'}} sizing="fit" />
						</Header>
						<Column>
							{lists.repo && <List list={data.user.repositories.nodes} />}
							{lists.org && <List list={data.user.organizations.nodes} />}
							{lists.fol &&  <List list={data.user.followers.nodes} />}
						</Column>
					</Panel>);
				}
			}}
		</Query>
	)
});
export default DetailBase;
export {DetailBase as Detail, DetailBase};
