import {Column} from '@enact/ui/Layout';
import gql from 'graphql-tag';
import {Header, Panel} from '@enact/moonstone/Panels';
import Image from '@enact/moonstone/Image';
import Spinner from '@enact/moonstone/Spinner';
import kind from '@enact/core/kind';
import List from '../components/List';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import React from 'react';

const GET_USER = gql`
  query ($login: String!) {
    user (login: $login) {
      name
      login
      avatarUrl
      organizations (first: 100) {
        nodes {
          name
        }
      }
      repositories (first: 100) {
        nodes {
          name
        }
      }
      followers (first: 100) {
        nodes {
          name
        }
      }
    }
  }
`;

const Detail = kind({
	name: 'Detail',

	propTypes: {
		userId: PropTypes.string.isRequired,
		fol: PropTypes.bool,
		org: PropTypes.bool,
		repo: PropTypes.bool
	},

	render: ({userId, repo, org, fol, ...rest}) => (
		<Query query={GET_USER} variables={{login: userId}}>
			{({loading, error, data}) => {
				if (loading) return <Panel {...rest}><Spinner>Loading...</Spinner></Panel>;
				if (error) return <Panel {...rest}><p>{error.message}</p></Panel>;

				return <Panel {...rest}>
					<Header type="compact" title={data.user.login} titleBelow={data.user.name}>
						<Image src={data.user.avatarUrl} style={{height: '3rem'}} sizing="fit" />
					</Header>
					<Column>
						{repo && <List title="Repositories" list={data.user.repositories.nodes} />}
						{org && <List title="Organizations" list={data.user.organizations.nodes} />}
						{fol &&  <List title="Followers" list={data.user.followers.nodes} />}
					</Column>
				</Panel>;
			}}
		</Query>
	)
});
export default Detail;
