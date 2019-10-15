const mainEl = document.querySelector('.main-content');

// Button
const buttonEls = Array.from(mainEl.querySelectorAll('.mdc-button, .mdc-fab'));
buttonEls.forEach((el) => mdc.ripple.MDCRipple.attachTo(el))

// List
const listEls = Array.from(mainEl.querySelectorAll('.demo-menu .mdc-list'));
listEls.forEach((el) => {
  let list = mdc.list.MDCList.attachTo(el)
  list.listElements.map((listItemEl) => mdc.ripple.MDCRipple.attachTo(listItemEl))
  list.singleSelection = true;
});

// Menu
const menuEl = mainEl.querySelector('.mdc-menu');
const menu = mdc.menu.MDCMenu.attachTo(menuEl)
menu.open = true;
// Override MDCMenuSurfaceFoundation so the menu never closes
menu.menuSurface_.foundation_.close = () => {};
// Focus first component when menu is done opening if not in an iframe
if (window.top === window) {
  menuEl.addEventListener('MDCMenuSurface:opened', () => document.querySelector('.mdc-button').focus());
}

// // Icon button toggle
const iconToggleEl = mainEl.querySelector('#icon-toggle-button');
const iconToggle = mdc.iconButton.MDCIconButtonToggle.attachTo(iconToggleEl)
iconToggle.unbounded = true;

// // Card
const cardPrimaryActionEls = Array.from(mainEl.querySelectorAll('.mdc-card__primary-action'));
cardPrimaryActionEls.forEach((el) => mdc.ripple.MDCRipple.attachTo(el))

// // Chips
const chipSetEls = Array.from(mainEl.querySelectorAll('.mdc-chip-set'));
chipSetEls.forEach((el) => mdc.chips.MDCChipSet.attachTo(el))

// // Text field
const textFieldEls = Array.from(mainEl.querySelectorAll('.mdc-text-field'));
textFieldEls.forEach((el) => {
  let textField = mdc.textField.MDCTextField.attachTo(el)
  if (el.classList.contains('text-field-with-input')) {
    textField.value = 'Input text';
  }
});

// // Linear progress
const linearProgressEl = mainEl.querySelector('.mdc-linear-progress');
const linearProgress = mdc.linearProgress.MDCLinearProgress.attachTo(linearProgressEl)
linearProgress.progress = 0.5;

// // Checkbox
const checkboxEls = Array.from(mainEl.querySelectorAll('.mdc-checkbox'));
checkboxEls.forEach((el) => {
  let checkbox = mdc.checkbox.MDCCheckbox.attachTo(el)
  if (el.classList.contains('indeterminate-checkbox')) {
    checkbox.indeterminate = true;
  }
});

// // Radio
const radioEls = Array.from(mainEl.querySelectorAll('.mdc-radio'));
radioEls.forEach((el) => mdc.radio.MDCRadio.attachTo(el))

// // Switch
const switchEls = Array.from(mainEl.querySelectorAll('.mdc-switch'));
switchEls.forEach((el) => mdc.switchControl.MDCSwitch.attachTo(el))

// // Top app bar
const topAppBarEls = Array.from(mainEl.querySelectorAll('.mdc-top-app-bar'));
topAppBarEls.forEach((el) => mdc.topAppBar.MDCTopAppBar.attachTo(el))

// // Select
const selectEls = Array.from(mainEl.querySelectorAll('.mdc-select'));
selectEls.forEach((el) => mdc.select.MDCSelect.attachTo(el))


// // Snackbar
const snackbarEl = mainEl.querySelector('.mdc-snackbar');
const snackbar = mdc.snackbar.MDCSnackbar.attachTo(snackbarEl)

// // Dialog
const dialogEl = mainEl.querySelector('.mdc-dialog');
const dialog = mdc.dialog.MDCDialog.attachTo(dialogEl)


// // Slider
const sliderEl = mainEl.querySelector('.mdc-slider');
const slider = mdc.slider.MDCSlider.attachTo(sliderEl)
slider.value = 5;

// // Tabs
const tabBarEl = mainEl.querySelector('.mdc-tab-bar');
const tabBar = mdc.tabBar.MDCTabBar.attachTo(tabBarEl)

// // Data Table
const dataTableEl = document.querySelector('.mdc-data-table');
const dataTable = mdc.dataTable.MDCDataTable.attachTo(dataTableEl)