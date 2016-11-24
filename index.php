<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.css">
	<link rel="stylesheet" href="/bower_components/font-awesome/css/font-awesome.css">
	<title>AngularJS Dropdown Multiselect</title>
</head>
<body>
	<div class="container-fluid" data-ng-app="app">
		<div class="row mb-3">
			<div class="col-xs-12">
				<h1 class="mb-3">AngularJS Dropdown Multiselect</h1>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-12">
				<div ng-init="options = [{ id: 1, label: 'Option1', option: '0', group: 'Group A' },{ id: 2, label: 'Option2', option: '00', group: 'Group B' },{ id: 3, label: 'Option3', option: '000', group: 'Group A' },{ id: 4, label: 'Option4', option: '0000', group: 'Group A' },{ id: 5, label: 'Option5', option: '00000', group: 'Group B' }]">
					<h6>Default options</h6>
					<hr>
					<div>{{options}}</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-12">
				<div ng-init="optionsDisabled = [{ id: 1, label: 'Option1', option: '0', group: 'Group A', disabled: 'true' },{ id: 2, label: 'Option2', option: '00', group: 'Group B' },{ id: 3, label: 'Option3', option: '000', group: 'Group A', disabled: 'true' },{ id: 4, label: 'Option4', option: '0000', group: 'Group A' },{ id: 5, label: 'Option5', option: '00000', group: 'Group B' }]">
					<h6>Disabled options</h6>
					<hr>
					<div>{{optionsDisabled}}</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-6">
				<h6>Multiselect - basic example</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel1" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove'
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel1 = []">{{myModel1}}</pre>
					</div>
				</div>
			</div>
			<div class="col-xs-6">
				<h6>Multiselect - basic settings</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel2" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove'
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel2 = []">{{myModel2}}</pre>
					</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-6">
				<h6>Multiselect - smart button text</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel3" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							smartButtonMaxItems: 3
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel3 = []">{{myModel3}}</pre>
					</div>
				</div>
			</div>
			<div class="col-xs-6">
				<h6>Multiselect - scrollable list</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel4" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							scrollableHeight: '200px',
							scrollable: true
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel4 = []">{{myModel4}}</pre>
					</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-6">
				<h6>Multiselect - search</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel5" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							enableSearch: true
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel5 = []">{{myModel5}}</pre>
					</div>
				</div>
			</div>
			<div class="col-xs-6">
				<h6>Multiselect - search by property</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel6" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							searchField: 'option',
							enableSearch: true
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel6 = []">{{myModel6}}</pre>
					</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-6">
				<h6>Multiselect - search button</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel7" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							showEnableSearchButton: true
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel7 = []">{{myModel7}}</pre>
					</div>
				</div>
			</div>
			<div class="col-xs-6">
				<h6>Multiselect - advanced search</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel8" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							enableSearch: true,
							showSelectAll: true,
							keyboardControls: true
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel8 = []">{{myModel8}}</pre>
					</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-6">
				<h6>Multiselect - max selected items</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel9" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							selectionLimit: 2
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel9 = []">{{myModel9}}</pre>
					</div>
				</div>
			</div>
			<div class="col-xs-6">
				<h6>Multiselect - 1 selected item</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel10" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							selectionLimit: 1
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel10 = {}">{{myModel10}}</pre>
					</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-6">
				<h6>Multiselect - grouping</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel11" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove'
						}" group-by="group"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel11 = []">{{myModel11}}</pre>
					</div>
				</div>
			</div>
			<div class="col-xs-6">
				<h6>Multiselect - select group</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel12" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							selectByGroups: ['Group A', 'Group B']
						}" group-by="group"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel12 = []">{{myModel12}}</pre>
					</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-6">
				<h6>Multiselect - custom ID and label</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel13" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							displayProp: 'id',
							idProp: 'label'
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel13 = []">{{myModel13}}</pre>
					</div>
				</div>
			</div>
			<div class="col-xs-6">
				<h6>Multiselect - custom model ID</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel14" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass	: 'fa fa-remove',
							externalIdProp: 'customId'
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel14 = []">{{myModel14}}</pre>
					</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-6">
				<h6>Multiselect - custom button text</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel15" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove'
						}" translation-texts="{
							buttonDefaultText: 'Select options'
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel15 = []">{{myModel15}}</pre>
					</div>
				</div>
			</div>
			<div class="col-xs-6">
				<h6>Multiselect - preselected model</h6>
				<hr>
				<div class="row">
					<div class="row">
						<div class="col-xs-6">
							<div data-ng-dropdown-multiselect="" selected-model="myModel17" options="options" extra-settings="{
								caretClass: 'fa fa-caret-down',
								checkedOnClass: 'fa fa-check',
								checkedOffClass: 'fa fa-remove'
							}"></div>
						</div>
						<div class="col-xs-6">
							<pre ng-init="myModel17 = [{
								id: 3
							}, {
								id: 4
							}]">{{myModel17}}</pre>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-6">
				<h6>Multiselect	- full object model</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel18" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							externalIdProp: ''
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel18 = []">{{myModel18}}</pre>
					</div>
				</div>
			</div>
			<div class="col-xs-6">
				<h6>Multiselect - external search filter</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div ng-init="myFilter = 'Option'"></div>
						<div data-ng-dropdown-multiselect="" search-filter="myFilter" selected-model="myModel19" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							enableSearch: true,
							searchFilter: '2'
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel19 = []">{{myModel19}}</pre>
					</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-6">
				<h6>Multiselect	- checkbox list</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel20" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove'
						}" checkboxes="true"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel20 = []">{{myModel20}}</pre>
					</div>
				</div>
			</div>
			<div class="col-xs-6">
				<h6>Multiselect - styled active item</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" search-filter="myFilter" selected-model="myModel21" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							styleActive: true
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel21 = []">{{myModel21}}</pre>
					</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-6">
				<h6>Multiselect	- keyboard controls</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel22" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							keyboardControls: true,
							enableSearch: true,
							selectionLimit: 2
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel22 = []">{{myModel22}}</pre>
					</div>
				</div>
			</div>
			<div class="col-xs-6">
				<h6>Multiselect	- keyboard controls with 1 selected item</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel23" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							keyboardControls: true,
							enableSearch: true,
							selectionLimit: 1
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel23 = []">{{myModel23}}</pre>
					</div>
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-xs-6">
				<h6>Multiselect	- custom template</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel24" options="options" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove',
							template: '<b>{{option.label}}</b>'
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel24 = []">{{myModel24}}</pre>
					</div>
				</div>
			</div>
			<div class="col-xs-6">
				<h6>Multiselect	- disabled</h6>
				<hr>
				<div class="row">
					<div class="col-xs-6">
						<div data-ng-dropdown-multiselect="" selected-model="myModel25" options="optionsDisabled" extra-settings="{
							caretClass: 'fa fa-caret-down',
							checkedOnClass: 'fa fa-check',
							checkedOffClass: 'fa fa-remove'
						}"></div>
					</div>
					<div class="col-xs-6">
						<pre ng-init="myModel25 = []">{{myModel25}}</pre>
					</div>
				</div>
			</div>
		</div>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
	</div>
	<script src="/bower_components/jquery/dist/jquery.js"></script>
	<script src="/bower_components/tether/dist/js/tether.js"></script>
	<script src="/bower_components/bootstrap/dist/js/bootstrap.js"></script>
	<script src="/bower_components/angular/angular.js"></script>
	<script src="/src/angularjs-dropdown-multiselect.js"></script>
	<script>
		(function (app) {
			app = angular.module('app', ['angularjs-dropdown-multiselect']);

			app.config(function () {});

		}(this));
	</script>
</body>
</html>
