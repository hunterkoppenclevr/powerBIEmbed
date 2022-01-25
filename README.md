## PowerBIEmbed Widget
Pluggable widget for easily embedding PowerBI reports, including applying custom filters.

## Features
- Embed a PowerBi report
- Set access rights to the report (read only up to full edit capabilities)
- Customize view settings (for example if you want to show the filters or set a custom theme)
- Apply custom filters

## Usage
Add the widget to the page and supply it with an accesstoken and embedtoken, use the provided submicroflows to get these. Dont forget to wrap the widget in a container with a specific height otherwise the iframe will not have enough height to show the full report in most cases.

If necessary you can push a custom filter into the embedded report, this can be useful in situation where you want to apply context of some Mendix data into the report (for example show a nice graph on a customer page that only has that customer’s data).

## Configuration

For applying custom filters the widget expects a valid JSON as a string into the custom filters field. The examples from the module itself already have an easy to understand mapping setup for you to use. Each custom filter always requires a type (basic/advanced), an operator (e.g. And/Or), a filter target (which table and which column) and a value. 

If you are not sure which values you need you can use the Get Filters Button option in the widget, this will render an extra button above the embedded report and once clicked will add a variable to the console log which you can inspect. If you combine this with the setting to show filters you can simply open the report, set the filters you would like for your report and then click the button and inspect the console to see exactly what filter settings you need (see image).

## Issues, suggestions and feature requests
You can report any issues with the widget here:
https://github.com/hunterkoppenclevr/powerBIEmbed/issues
