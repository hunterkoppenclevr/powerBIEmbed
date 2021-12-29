
import { Component, createElement } from 'react';
import { models } from 'powerbi-client';
import { PowerBIEmbed,  } from 'powerbi-client-react';

// Root Component to demonstrate usage of wrapper component
class EmbedContainer extends Component {
	constructor(props) {
		super(props);
		this.eventHandlersMap = null;
		this.state = {
			embedUrl: undefined,
			accessToken: undefined,
			zoomLevel: 1,
			configuration: {
				type: 'report',
				id: undefined,
				embedUrl: undefined,
				accessToken: undefined,
				tokenType: models.TokenType.Embed,
				settings: {
					panes: {
						filters: {
							expanded: false,
							visible: false
						}
					},
					zoomLevel: 1,
					background: models.BackgroundType.Transparent,
				}
			}
		};
	}

	componentDidMount() {
		// fired after first render
	}

	componentDidUpdate(prevProps) {
		console.log('configUpdateWithUrl=' + JSON.stringify(this.state.configuration));
		if (prevProps && prevProps === this.props) {
			// Nothing changed
		} else if (!this.props && !prevProps) {
			// Props still empty
		} else {
			if (prevProps.embedUrl.value !== this.props.embedUrl.value) {
				this.setState(prevState => ({
					configuration: {
						...prevState.configuration,
						embedUrl: this.props.embedUrl.value,
						accessToken: this.props.accessToken.value,
						settings: {
							...prevState.configuration.settings,
							zoomLevel: Number(this.props.zoomLevel.value)
						}  
					}
				}));
			} else if (prevProps.zoomLevel.value !== this.props.zoomLevel.value) {
				this.setState(prevState => ({
					configuration: {
						...prevState.configuration,
						settings: {
							...prevState.configuration.settings,
							zoomLevel: Number(this.props.zoomLevel.value)
						}  
					}
				}));
			}
		}
	}

	render() {
		const eventHandlersMap = new Map([
			['loaded', function () {
				console.log('Report has loaded');
			}],
			['rendered', function () {
				console.log('Report has rendered');
			}],
			['error', function (event) {
				console.log(event.detail);
			}]
		]);

		return (
			<PowerBIEmbed
				embedConfig={this.state.configuration}
				eventHandlers={eventHandlersMap}
				cssClassName={"powerbiEmbedRoot"}
				getEmbeddedComponent={(embeddedReport) => {
					window.report = embeddedReport;
				}}
			/>
		);
	};
}

export default EmbedContainer;