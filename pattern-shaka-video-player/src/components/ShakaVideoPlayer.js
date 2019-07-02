import hoc from '@enact/core/hoc';
import VideoPlayer from "@enact/moonstone/VideoPlayer";
import React from 'react';
import PropTypes from 'prop-types';
import shaka from 'shaka-player';

function initPlayer(config, manifestUri) {
  // Create a Player instance.
    const video = document.querySelector('video');
    const player = new shaka.Player(video);

    // Listen for error events.
    player.addEventListener('error', onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    player
        .load(manifestUri)
        .then(function() {
            // This runs if the asynchronous load is successful.
            console.log('The video has now been loaded!');
        })
        .catch(onError); // onError is executed if the asynchronous load fails.
    // Configure player
    player.configure(config);
}

function onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    onError(event.detail);
}

function onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
}

const defaultConfig = {
    preferredAudioLanguage: 'en-US',
    playRangeStart: 420
};

const ShakaPlayerDecorator = hoc(defaultConfig, (config, Wrapped) => {
	return class extends React.Component {
        static displayName = 'ShakaPlayerDecorator';

        static propTypes = {
            manifestUri: PropTypes.string
        };

        componentDidMount () {
            // Install built-in polyfills to patch browser incompatibilities.
            shaka.polyfill.installAll();

            // Check to see if the browser supports the basic APIs Shaka needs.
            if (shaka.Player.isBrowserSupported()) {
                // Everything looks good!
                initPlayer(config, this.props.manifestUri);
            } else {
                // This browser does not have the minimum set of APIs we need.
                console.error('Browser not supported!');
            }
        }

		render () {
			const props = Object.assign({}, this.props);
            delete props.manifestUri;

			return <Wrapped {...props} />
		}
	}
});

const ShakaVideoPlayer = ShakaPlayerDecorator(VideoPlayer);

export default ShakaVideoPlayer;
