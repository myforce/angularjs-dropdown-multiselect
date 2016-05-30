# AngularJS Dropdown Multiselect
This directive gives you a Bootstrap Dropdown with the power of AngularJS directives.

# Features
- Based on Bootstrap's dropdown.
- jQuery is not necessary.
- Seperated your data and the selection data. no modification to the data made.
- Built-in search.
- Complete control on the selected items model to fit it to your requirements.
- Two view options: normal list and checkboxes.
- Pre-selected values.
- Limit selection count.
- Grouping items by property.
- Callback events.
- Translation texts.
- Scrollable list (useful for big lists)
- Select by groups
- Custom scrollbar

## Dependencies
- required: AngularJS >= 1.2, Bootstrap >= 3.0, angular-smooth-scrollbar >= 6.2.0

- Make sure to add the dependencies before the directive's js file. 
- Note: Bootstrap JS file is not needed for the directive, it just uses the CSS file

## Install

1. First of all see https://github.com/idiotWu/angular-smooth-scrollbar
2. Download the files
	1. Using bower: <img src="http://benschwarz.github.io/bower-badges/badge@2x.png" width="130" height="30">
	
		Just run `bower install morow93-angularjs-dropdown-multiselect`
	2. Manually:
		You can download the `.js` file directly or clone this repository
3. Include the file in your app
	- `<script type="text/javascript" src="angularjs-dropdown-multiselect.js"></script>`.
	- You can also use the minfined version (`angularjs-dropdown-multiselect.min.js`).
	- Also don't forget about angular-smooth-scrollbar dependencies
4. Include the module in angular (i.e. in `app.js`) - `angularjs-dropdown-multiselect`

