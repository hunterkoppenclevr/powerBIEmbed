
import { Component, createElement } from 'react';
import { models } from 'powerbi-client';
import { PowerBIEmbed, } from 'powerbi-client-react';

// Root Component to demonstrate usage of wrapper component
class EmbedContainer extends Component {
	constructor(props) {
		super(props);
		const baseConfiguration = {
			type: 'report',
			tokenType: models.TokenType.Embed
		}
		this.state = {
			configuration: baseConfiguration
		};

		this.eventHandlersMap = null;
		this.report = undefined;
		this.getFiltersHandler = this.getFilters.bind(this);
	}

	componentDidUpdate(prevProps) {
		console.debug('configUpdateWithUrl=' + JSON.stringify(this.state.configuration));
		if (prevProps && prevProps === this.props) {
			// Nothing changed
		} else if (!this.props && !prevProps) {
			// Props still empty
		} else {
			if (prevProps.embedUrl.value !== this.props.embedUrl.value) {
				this.setInitialSetting();
			} else if (prevProps.zoomLevel.value !== this.props.zoomLevel.value) {
				// Update state if zoomlevel has changed.
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

	setInitialSetting() {
		//console.log('viewmode='+this.props.viewMode);
		const viewMode = this.props.viewMode === 'view' ? models.ViewMode.View : models.ViewMode.Edit
		let permissions = this.props.permissions;
		switch (permissions) {
			case 'readWrite':
				permissions = models.Permissions.ReadWrite;
				break;
			case 'copy':
				permissions = models.Permissions.Copy;
				break;
			case 'create':
				permissions = models.Permissions.Create;
				break;
			case 'all':
				permissions = models.Permissions.All;
				break;
			default:
				permissions = models.Permissions.Read;
		};
		const background = this.props.backgroundTransparent ? models.BackgroundType.Transparent : models.BackgroundType.Default;
		const pageName = this.props.defaultPage ? this.props.defaultPage.value : undefined;
		const themeJsonObject = this.props.themeJsonString ? JSON.parse(this.props.themeJsonString.value) : undefined;
		const filters = this.props.filterJson ? JSON.parse(this.props.filterJson.value) : [];
		this.setState(prevState => ({
			configuration: {
				...prevState.configuration,
				embedUrl: this.props.embedUrl.value,
				accessToken: this.props.accessToken.value,
				viewMode: viewMode,
				permissions: permissions,
				pageName: pageName,
				settings: {
					...prevState.configuration.settings,
					zoomLevel: Number(this.props.zoomLevel.value),
					background: background,
					panes: {
						bookmarks: {
							visible: this.props.paneBookmarksVisible
						},
						fields: {
							visible: this.props.paneFieldsVisible,
							expanded: this.props.paneFieldsExpanded
						},
						filters: {
							expanded: this.props.paneFiltersExpanded,
							visible: this.props.paneFiltersVisible
						},
						pageNavigation: {
							visible: this.props.panePageNavigationVisible
						},
						selection: {
							visible: this.props.paneSelectionVisible
						},
						syncSlicers: {
							visible: this.props.paneSyncSlicersVisible
						},
						visualizations: {
							visible: this.props.paneVisualizationsVisible,
							expanded: this.props.paneVisualizationsExpanded
						}
					},
					bars: {
						actionBar: {
							visible: this.props.actionBarVisible
						}
					},
					theme: {
						themeJson: themeJsonObject
					}
				},
				filters: filters
			}
		}));
	}

	getFilters() {
		console.log(this.report.getFilters());
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

		let filtersButton = undefined
		if (this.props.getFiltersButton) {
			filtersButton = <button onClick={this.getFiltersHandler}>Get Filters</button>
		}


		return (
			<div className='powerbiEmbedRoot'>
				{filtersButton}
				<PowerBIEmbed
					embedConfig={this.state.configuration}
					eventHandlers={eventHandlersMap}
					cssClassName={"powerbiEmbedRoot"}
					getEmbeddedComponent={(embeddedReport) => {
						this.report = embeddedReport;
					}}
				/>
			</div>

		);
	};
}

export default EmbedContainer;