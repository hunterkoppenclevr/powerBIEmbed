import { Component, createElement } from "react";

import EmbedContainer from "./components/EmbedContainer";
import "./ui/PowerBIEmbed.css";

export default class PowerBIEmbed extends Component {
    render() {
        return <EmbedContainer
            embedUrl={this.props.embedUrl}
            accessToken={this.props.accessToken}
            zoomLevel={this.props.zoomLevel}
        />;
    }
}
