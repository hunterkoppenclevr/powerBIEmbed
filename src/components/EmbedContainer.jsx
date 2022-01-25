import { Component, createElement } from "react";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";

// Root Component to demonstrate usage of wrapper component
class EmbedContainer extends Component {
    baseConfiguration = {
        type: "report",
        tokenType: models.TokenType.Embed
    };

    state = {
        configuration: this.baseConfiguration,
        report: null
    };

    getFiltersHandler = this.getFilters.bind(this);
    getEmbeddedReportHandler = this.getEmbeddedReport.bind(this);

    componentDidUpdate(prevProps) {
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

    setInitialSetting() {
        const {
            backgroundTransparent,
            defaultPage,
            themeJsonString,
            filterJson,
            embedUrl,
            accessToken,
            zoomLevel,
            paneBookmarksVisible,
            paneFieldsVisible,
            paneFieldsExpanded,
            paneFiltersExpanded,
            paneFiltersVisible,
            panePageNavigationVisible,
            paneSelectionVisible,
            paneSyncSlicersVisible,
            paneVisualizationsVisible,
            paneVisualizationsExpanded,
            actionBarVisible
        } = this.props;
        const viewMode = this.props.viewMode === "view" ? models.ViewMode.View : models.ViewMode.Edit;
        let permissions = this.props.permissions;
        switch (permissions) {
            case "readWrite":
                permissions = models.Permissions.ReadWrite;
                break;
            case "copy":
                permissions = models.Permissions.Copy;
                break;
            case "create":
                permissions = models.Permissions.Create;
                break;
            case "all":
                permissions = models.Permissions.All;
                break;
            default:
                permissions = models.Permissions.Read;
        }
        const background = backgroundTransparent ? models.BackgroundType.Transparent : models.BackgroundType.Default;
        const pageName = defaultPage ? defaultPage.value : undefined;
        const themeJson = themeJsonString ? JSON.parse(themeJsonString.value) : undefined;
        const filters = filterJson && filterJson.value ? JSON.parse(filterJson.value) : [];
        this.setState(prevState => ({
            configuration: {
                ...prevState.configuration,
                embedUrl: embedUrl.value,
                accessToken: accessToken.value,
                viewMode,
                permissions,
                pageName,
                settings: {
                    ...prevState.configuration.settings,
                    zoomLevel: Number(zoomLevel.value),
                    background: background,
                    panes: {
                        bookmarks: {
                            visible: paneBookmarksVisible
                        },
                        fields: {
                            visible: paneFieldsVisible,
                            expanded: paneFieldsExpanded
                        },
                        filters: {
                            expanded: paneFiltersExpanded,
                            visible: paneFiltersVisible
                        },
                        pageNavigation: {
                            visible: panePageNavigationVisible
                        },
                        selection: {
                            visible: paneSelectionVisible
                        },
                        syncSlicers: {
                            visible: paneSyncSlicersVisible
                        },
                        visualizations: {
                            visible: paneVisualizationsVisible,
                            expanded: paneVisualizationsExpanded
                        }
                    },
                    bars: {
                        actionBar: {
                            visible: actionBarVisible
                        }
                    },
                    theme: {
                        themeJson
                    }
                },
                filters
            }
        }));
    }

    getEmbeddedReport(embeddedReport) {
        this.setState({ report: embeddedReport });
    }

    getFilters() {
        console.log(this.state.report.getFilters());
    }

    render() {
        const eventHandlersMap = new Map([
            [
                "loaded",
                // eslint-disable-next-line
                function () {
                    console.debug("Report has loaded");
                }
            ],
            [
                "rendered",
                // eslint-disable-next-line
                function () {
                    console.debug("Report has rendered");
                }
            ],
            [
                "error",
                // eslint-disable-next-line
                function (event) {
                    console.error(event.detail);
                }
            ]
        ]);

        let filtersButton;
        if (this.props.getFiltersButton) {
            filtersButton = <button onClick={this.getFiltersHandler}>Get Filters</button>;
        }

        return (
            <div className="powerbiEmbedRoot">
                {filtersButton}
                <PowerBIEmbed
                    embedConfig={this.state.configuration}
                    eventHandlers={eventHandlersMap}
                    cssClassName={"powerbiEmbedRoot"}
                    getEmbeddedComponent={this.getEmbeddedReportHandler}
                />
            </div>
        );
    }
}

export default EmbedContainer;
