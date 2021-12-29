import { Component, createElement } from "react";

import EmbedContainer from "./components/EmbedContainer";
import "./ui/PowerBIEmbed.css";

export default class PowerBIEmbed extends Component {
    render() {
        return <EmbedContainer
            embedUrl={this.props.embedUrl}
            accessToken={this.props.accessToken}
            zoomLevel={this.props.zoomLevel}
            panePageNavigationVisible={this.props.panePageNavigationVisible}
            paneFiltersExpanded={this.props.paneFiltersExpanded}
            paneFiltersVisible={this.props.paneFiltersVisible}
            paneFieldsExpanded={this.props.paneFieldsExpanded}
            paneFieldsVisible={this.props.paneFieldsVisible}
            paneVisualizationsExpanded={this.props.paneVisualizationsExpanded}
            paneVisualizationsVisible={this.props.paneVisualizationsVisible}
            paneBookmarksVisible={this.props.paneBookmarksVisible}
            paneSelectionVisible={this.props.paneSelectionVisible}
            paneSyncSlicersVisible={this.props.paneSyncSlicersVisible}
        />;
    }
}
