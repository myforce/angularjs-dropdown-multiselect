'use strict';

var directiveModule = angular.module('angularjs-dropdown-multiselect', []);

directiveModule.directive('mfDropdownStaticInclude', ['$compile', function($compile) {
	return function(scope, element, attrs) {
		var template = attrs.mfDropdownStaticInclude;
		var contents = element.html(template).contents();
		$compile(contents)(scope);
	};
}]);

directiveModule.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse', function($filter, $document, $compile, $parse) {
	return {
		restrict: 'AE',
		scope: {
			selectedModel: '=',
			options: '=',
			extraSettings: '=',
			events: '=',
			searchFilter: '=?',
			translationTexts: '=',
			groupBy: '@',
			disabled: "="
		},
		template: function(element, attrs) {
			var checkboxes = attrs.checkboxes ? true : false;
			var groups = attrs.groupBy ? true : false;

			var template = '<div class="multiselect-parent {{settings.dropdownClass}}" ng-class="{open: open}">';
			template += '<button ng-disabled="disabled" type="button" class="dropdown" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="{{settings.caretClass}}"></span></button>';
			template += '<div class="dropdown-menu" ng-if="open" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\', overflow: \'auto\' }" >';
			template += '<a class="dropdown-item" ng-if="settings.showCheckAll && settings.selectionLimit !== 1" ng-keydown="keyDownLink($event)" data-ng-click="selectAll()" tabindex="-1" id="selectAll"><span class="{{settings.checkedOnClass}}"></span> {{texts.checkAll}}</a>';
			template += '<a class="dropdown-item" ng-if="settings.showUncheckAll" ng-keydown="keyDownLink($event)" data-ng-click="deselectAll();" tabindex="-1" id="deselectAll"><span class="{{settings.checkedOffClass}}"></span> {{texts.uncheckAll}}</a>';
			template += '<div class="dropdown-item" ng-if="settings.selectByGroups && ((settings.showCheckAll && settings.selectionLimit > 0) || settings.showUncheckAll)" class="dropdown-divider"></div>';
			template += '<a class="dropdown-item" ng-repeat="currentGroup in settings.selectByGroups track by $index" ng-click="selectCurrentGroup(currentGroup)" ng-class="{\'dropdown-selected-group\': selectedGroup === currentGroup}" tabindex="-1">{{::texts.selectGroup}} {{::getGroupLabel(currentGroup)}}</a>';
			template += '<div class="dropdown-item" ng-if="settings.selectByGroups && settings.showEnableSearchButton" class="dropdown-divider"></div>';
			template += '<a class="dropdown-item" ng-if="settings.showEnableSearchButton && settings.enableSearch" ng-keydown="keyDownLink($event); keyDownToggleSearch();" ng-click="toggleSearch($event);" tabindex="-1">{{texts.disableSearch}}</a>';
			template += '<a class="dropdown-item" ng-if="settings.showEnableSearchButton && !settings.enableSearch" ng-keydown="keyDownLink($event); keyDownToggleSearch();" ng-click="toggleSearch($event);" tabindex="-1">{{texts.enableSearch}}</a>';
			template += '<div ng-if="(settings.showCheckAll && settings.selectionLimit > 0) || settings.showUncheckAll || settings.showEnableSearchButton" class="dropdown-divider"></div>';
			template += '<div class="px-1" ng-if="settings.enableSearch"><input type="text" class="form-control form-control-sm searchField" ng-keydown="keyDownSearchDefault($event); keyDownSearch($event, input.searchFilter);" ng-style="{width: \'100%\'}" ng-model="input.searchFilter" placeholder="{{texts.searchPlaceholder}}" /></div>';
			template += '<div ng-if="settings.enableSearch" class="dropdown-divider"></div>';

			if (groups) {
				template += '<h6 class="dropdown-header" ng-repeat-start="option in orderedItems | filter:getFilter(input.searchFilter)" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation">{{ getGroupLabel(getPropertyForObject(option, settings.groupBy)) }}</h6>';
				template += '<a class="dropdown-item" ng-class="{\'active\': isChecked(getPropertyForObject(option,settings.idProp)) && settings.styleActive, \'disabled\': option.disabled}" ng-repeat-end role="presentation" ng-keydown="option.disabled || keyDownLink($event)" ng-click="option.disabled || setSelectedItem(getPropertyForObject(option,settings.idProp), false, true)" ng-disabled="option.disabled" tabindex="-1">';
			} else {
				template += '<a class="dropdown-item" ng-class="{\'active\': isChecked(getPropertyForObject(option,settings.idProp)) && settings.styleActive, \'disabled\': option.disabled}" role="presentation" ng-repeat="option in options | filter:getFilter(input.searchFilter)" ng-keydown="option.disabled || keyDownLink($event)" ng-click="option.disabled || setSelectedItem(getPropertyForObject(option,settings.idProp), false, true)" ng-disabled="option.disabled" tabindex="-1">';
			}

			template += '<div class="option" role="menuitem">';

			if (checkboxes) {
				template += '<div class="form-check mb-0"><label class="form-check-label"><input class="form-check-input checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> <span mf-dropdown-static-include="{{settings.template}}"></div></label></span></div>';
			} else {
				template += '<span data-ng-class="{\'{{settings.checkedOnClass}}\': isChecked(getPropertyForObject(option,settings.idProp))}"> </span> <span mf-dropdown-static-include="{{settings.template}}"></span></div>';
			}

			template += '</a>';

			template += '<div class="dropdown-divider" ng-show="settings.selectionLimit > 1"></div>';
			template += '<a class="dropdown-item" role="presentation" ng-show="settings.selectionLimit > 1" role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a>';

			template += '</div>';
			template += '</div>';

			element.html(template);
		},
		link: function($scope, $element, $attrs) {
			var $dropdownTrigger = $element.children()[0];

			$scope.toggleDropdown = function() {
        if ($scope.open) {
          $scope.close();
        } else { $scope.open = true; }
				if ($scope.settings.keyboardControls) {
					if ($scope.open) {
						if ($scope.settings.selectionLimit === 1 && $scope.settings.enableSearch) {
							setTimeout(function() {
								angular.element($element)[0].querySelector('.searchField').focus();
							}, 0);
						} else {
							setTimeout(function() {
								angular.element($element)[0].querySelector('.option').parentNode.focus();
							}, 0);
						}
					}
				}
			};

			$scope.checkboxClick = function($event, id) {
				$scope.setSelectedItem(id, false, true);
				$event.stopImmediatePropagation();
			};

			$scope.externalEvents = {
				onItemSelect: angular.noop,
				onItemDeselect: angular.noop,
				onSelectAll: angular.noop,
				onDeselectAll: angular.noop,
				onInitDone: angular.noop,
				onMaxSelectionReached: angular.noop,
				onSelectionChanged: angular.noop,
				onClose: angular.noop
			};

			$scope.settings = {
				dynamicTitle: true,
				scrollable: false,
				scrollableHeight: '300px',
				closeOnBlur: true,
				displayProp: 'label',
				idProp: 'id',
				externalIdProp: 'id',
				enableSearch: false,
				selectionLimit: 0,
				showCheckAll: true,
				showUncheckAll: true,
				showEnableSearchButton: false,
				closeOnSelect: false,
				dropdownClass: 'dropdown',
				buttonClasses: 'btn btn-default',
				caretClass: '',
				checkedOnClass: '',
				checkedOffClass: '',
				closeOnDeselect: false,
				groupBy: $attrs.groupBy || undefined,
				groupByTextProvider: null,
				smartButtonMaxItems: 0,
				smartButtonTextConverter: angular.noop,
				styleActive: false,
				keyboardControls: false,
				template: '{{getPropertyForObject(option, settings.displayProp)}}',
				searchField: '$'
			};

			$scope.texts = {
				checkAll: 'Check All',
				uncheckAll: 'Uncheck All',
				selectionCount: 'checked',
				selectionOf: '/',
				searchPlaceholder: 'Search...',
				buttonDefaultText: 'Select',
				dynamicButtonTextSuffix: 'checked',
				disableSearch: 'Disable search',
				enableSearch: 'Enable search',
				selectGroup: 'Select all:'
			};

			$scope.input = {
				searchFilter: $scope.searchFilter || ''
			};

			if (angular.isDefined($scope.settings.groupBy)) {
				$scope.$watch('options', function(newValue) {
					if (angular.isDefined(newValue)) {
						$scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);
					}
				});
			}

			$scope.$watch('selectedModel', function(newValue) {
				if (!Array.isArray(newValue)) {
					$scope.singleSelection = true;
				} else {
					$scope.singleSelection = false;
				}
			});

			$scope.close = function(){
				$scope.open = false;
				$scope.externalEvents.onClose();
			};

			$scope.selectCurrentGroup = function(currentGroup) {
				$scope.selectedModel.splice(0, $scope.selectedModel.length);
				if ($scope.orderedItems) {
					$scope.orderedItems.forEach(function(item) {
						if (item[$scope.groupBy] === currentGroup) {
							$scope.setSelectedItem($scope.getPropertyForObject(item, $scope.settings.idProp), false, false);
						}
					});
				}
				$scope.externalEvents.onSelectionChanged();
			};

			angular.extend($scope.settings, $scope.extraSettings || []);
			angular.extend($scope.externalEvents, $scope.events || []);
			angular.extend($scope.texts, $scope.translationTexts);

			$scope.singleSelection = $scope.settings.selectionLimit === 1;

			function getFindObj(id) {
				var findObj = {};

				if ($scope.settings.externalIdProp === '') {
					findObj[$scope.settings.idProp] = id;
				} else {
					findObj[$scope.settings.externalIdProp] = id;
				}

				return findObj;
			}

			function clearObject(object) {
				for (var prop in object) {
					delete object[prop];
				}
			}

			if ($scope.singleSelection) {
				if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {
					clearObject($scope.selectedModel);
				}
			}

			if ($scope.settings.closeOnBlur) {
				$document.on('click', function(e) {
					if ($scope.open) {
						var target = e.target.parentElement;
						var parentFound = false;

						while (angular.isDefined(target) && target !== null && !parentFound) {
							if (!!target.className.split && contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
								if (target === $dropdownTrigger) {
									parentFound = true;
								}
							}
							target = target.parentElement;
						}

						if (!parentFound) {
							$scope.$apply(function() {
								$scope.close();
							});
						}
					}
				});
			}

			$scope.getGroupLabel = function(groupValue) {
				if ($scope.settings.groupByTextProvider !== null) {
					return $scope.settings.groupByTextProvider(groupValue);
				}

				return groupValue;
			};

			$scope.getButtonText = function() {
				if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && Object.keys($scope.selectedModel).length > 0))) {
					if ($scope.settings.smartButtonMaxItems > 0) {
						var itemsText = [];

						angular.forEach($scope.options, function(optionItem) {
							if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
								var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
								var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

								itemsText.push(converterResponse ? converterResponse : displayText);
							}
						});

						if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
							itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
							itemsText.push('...');
						}

						return itemsText.join(', ');
					} else {
						var totalSelected;

						if ($scope.singleSelection) {
							totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
						} else {
							totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
						}

						if (totalSelected === 0) {
							return $scope.texts.buttonDefaultText;
						} else {
							return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
						}
					}
				} else {
					return $scope.texts.buttonDefaultText;
				}
			};

			$scope.getPropertyForObject = function(object, property) {
				if (angular.isDefined(object) && object.hasOwnProperty(property)) {
					return object[property];
				}

				return '';
			};

			$scope.selectAll = function() {
				var searchResult;
				$scope.deselectAll(true);
				$scope.externalEvents.onSelectAll();

				searchResult = $filter('filter')($scope.options, $scope.getFilter($scope.input.searchFilter));
				angular.forEach(searchResult, function(value) {
					$scope.setSelectedItem(value[$scope.settings.idProp], true, false);
				});
				$scope.externalEvents.onSelectionChanged();
				$scope.selectedGroup = null;
			};

			$scope.deselectAll = function(dontSendEvent) {
				dontSendEvent = dontSendEvent || false;

				if (!dontSendEvent) {
					$scope.externalEvents.onDeselectAll();
				}

				if ($scope.singleSelection) {
					clearObject($scope.selectedModel);
				} else {
					$scope.selectedModel.splice(0, $scope.selectedModel.length);
				}
				if (!dontSendEvent) {
					$scope.externalEvents.onSelectionChanged();
				}
				$scope.selectedGroup = null;
			};

			$scope.setSelectedItem = function(id, dontRemove, fireSelectionChange) {
				var findObj = getFindObj(id);
				var finalObj = null;

				if ($scope.settings.externalIdProp === '') {
					finalObj = find($scope.options, findObj);
				} else {
					finalObj = findObj;
				}

				if ($scope.singleSelection) {
					clearObject($scope.selectedModel);
					angular.extend($scope.selectedModel, finalObj);
					$scope.externalEvents.onItemSelect(finalObj);
					if ($scope.settings.closeOnSelect || $scope.settings.closeOnDeselect) $scope.close();
				} else {
					dontRemove = dontRemove || false;

					var exists = findIndex($scope.selectedModel, findObj) !== -1;

					if (!dontRemove && exists) {
						$scope.selectedModel.splice(findIndex($scope.selectedModel, findObj), 1);
						$scope.externalEvents.onItemDeselect(findObj);
						if ($scope.settings.closeOnDeselect) $scope.close();
					} else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
						$scope.selectedModel.push(finalObj);
						$scope.externalEvents.onItemSelect(finalObj);
						if ($scope.settings.closeOnSelect) $scope.close();
						if ($scope.settings.selectionLimit > 0 && $scope.selectedModel.length === $scope.settings.selectionLimit) {
							$scope.externalEvents.onMaxSelectionReached();
						}
					}
				}
				if (fireSelectionChange) {
					$scope.externalEvents.onSelectionChanged();
				}
				$scope.selectedGroup = null;
			};

			$scope.isChecked = function(id) {
				if ($scope.singleSelection) {
					return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
				}

				return findIndex($scope.selectedModel, getFindObj(id)) !== -1;
			};

			$scope.externalEvents.onInitDone();

			$scope.keyDownLink = function(event) {
				var sourceScope = angular.element(event.target).scope();
				var nextOption;
				var target = event.target;
				if (!$scope.settings.keyboardControls) {
					return;
				}
				if (event.keyCode === 13 || event.keyCode === 32) { // enter
					event.preventDefault();
					if (!!sourceScope.option) {
						$scope.setSelectedItem($scope.getPropertyForObject(sourceScope.option, $scope.settings.idProp), false, true);
					} else if (event.target.id === 'deselectAll') {
						$scope.deselectAll();
					} else if (event.target.id === 'selectAll') {
						$scope.selectAll();
					}
				} else if (event.keyCode === 38) { // up arrow
					event.preventDefault();
					if (!!target.previousElementSibling) {
						nextOption = (target.previousElementSibling.nodeName === 'A') ? target.previousElementSibling : target.previousElementSibling.querySelector('input');
					}
					while (!nextOption && !!target) {
						target = target.previousElementSibling;
						if (!!target) {
							nextOption = (target.nodeName === 'A') ? target : target.querySelector('input');
						}
					}
					if (!!nextOption) {
						nextOption.focus();
					}
				} else if (event.keyCode === 40) { // down arrow
					event.preventDefault();
					if (!!target.nextElementSibling) {
						nextOption = (target.nextElementSibling.nodeName === 'A') ? target.nextElementSibling : target.nextElementSibling.querySelector('input');
					}
					while (!nextOption && !!target) {
						target = target.nextElementSibling;
						if (!!target) {
							nextOption = (target.nodeName === 'A') ? target : target.querySelector('input');
						}
					}
					if (!!nextOption) {
						nextOption.focus();
					}
				} else if (event.keyCode === 27) {
					event.preventDefault();

					$scope.toggleDropdown();
				}
			};

			$scope.keyDownSearchDefault = function(event) {
				var target = event.target;
				var nextOption;
				if (!$scope.settings.keyboardControls) {
					return;
				}
				if (event.keyCode === 9 || event.keyCode === 40) { //tab
					event.preventDefault();
					setTimeout(function() {
						angular.element($element)[0].querySelector('.option').parentNode.focus();
					}, 0);
				} else if (event.keyCode === 38) {
					event.preventDefault();
					if (!!target.previousElementSibling) {
						nextOption = (target.previousElementSibling.nodeName === 'A') ? target.previousElementSibling : target.previousElementSibling.querySelector('input');
					}
					target = target.parentNode;
					while (!nextOption && !!target) {
						target = target.previousElementSibling;
						if (!!target) {
							nextOption = (target.nodeName === 'A') ? target : target.querySelector('input');
						}
					}

					if (!!nextOption) {
						nextOption.focus();
					}
				} else if (event.keyCode === 27) {
					event.preventDefault();

					$scope.toggleDropdown();
				}
			};

			$scope.keyDownSearch = function(event, searchFilter) {
				var searchResult;
				if (!$scope.settings.keyboardControls) {
					return;
				}
				if (event.keyCode === 13) {
					if ($scope.settings.selectionLimit === 1 && $scope.settings.enableSearch) {
						searchResult = $filter('filter')($scope.options, $scope.getFilter(searchFilter));
						if (searchResult.length === 1) {
							$scope.setSelectedItem($scope.getPropertyForObject(searchResult[0], $scope.settings.idProp), false, true);
						}
					} else if ($scope.settings.enableSearch) {
						$scope.selectAll();
					}
				}
			};

			$scope.getFilter = function(searchFilter) {
				var filter = {};
				filter[$scope.settings.searchField] = searchFilter;
				return filter;
			};

			$scope.toggleSearch = function($event) {
				if ($event) {
					$event.stopPropagation();
				}
				$scope.settings.enableSearch = !$scope.settings.enableSearch;
				if (!$scope.settings.enableSearch) {
					$scope.input.searchFilter = '';
				}
			};

			$scope.keyDownToggleSearch = function() {
				if (!$scope.settings.keyboardControls) {
					return;
				}
				if (event.keyCode === 13) {
					$scope.toggleSearch();
					if ($scope.settings.enableSearch) {
						setTimeout(
							function() {
								angular.element($element)[0].querySelector('.searchField').focus();
							}, 0
						);
					} else {
						angular.element($element)[0].querySelector('.option').focus();
					}
				}
			};
		}
	};
}]);

function contains(collection, target) {
	var containsTarget = false;
	collection.some(function(object) {
		if (object === target) {
			containsTarget = true;
			return true;
		}
	});
	return containsTarget;
}

function find(collection, properties) {
	var target;

	collection.some(function(object) {
		var hasAllSameProperties = true;
		Object.keys(properties).forEach(function(key) {
			if (object[key] !== properties[key]) {
				hasAllSameProperties = false;
			}
		});
		if (hasAllSameProperties) {
			target = object;
			return true;
		}
	});

	return target;
}

function findIndex(collection, properties) {
	var index = -1;
	var counter = -1;

	collection.some(function(object) {
		var hasAllSameProperties = true;
		counter += 1;
		Object.keys(properties).forEach(function(key) {
			if (object[key] !== properties[key]) {
				hasAllSameProperties = false;
			}
		});
		if (hasAllSameProperties) {
			index = counter;
			return true;
		}
	});

	return index;
}
