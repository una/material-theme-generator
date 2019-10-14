const mainEl = document.querySelector('.main-content');

// Button
const buttonEls = Array.from(mainEl.querySelectorAll('.mdc-button, .mdc-fab'));
buttonEls.forEach((el) => mdc.ripple.MDCRipple.attachTo(el))

// List
const listEls = Array.from(mainEl.querySelectorAll('.mdc-list'));
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
// const iconToggleEl = mainEl.querySelector('#icon-toggle-button');
// const iconToggle = new MDCIconButtonToggle(iconToggleEl);
// iconToggle.unbounded = true;

// // Card
// const cardPrimaryActionEls = Array.from(mainEl.querySelectorAll('.mdc-card__primary-action'));
// cardPrimaryActionEls.forEach((el) => new MDCRipple(el));

// // Chips
// const chipSetEls = Array.from(mainEl.querySelectorAll('.mdc-chip-set'));
// chipSetEls.forEach((el) => new MDCChipSet(el));

// // Text field
const textFieldEls = Array.from(mainEl.querySelectorAll('.mdc-text-field'));
textFieldEls.forEach((el) => {
  let textField = mdc.textField.MDCTextField.attachTo(el)
  if (el.classList.contains('text-field-with-input')) {
    textField.value = 'Input text';
  }
});
// const helperTextEls = Array.from(mainEl.querySelectorAll('.mdc-text-field-helper-text'));
// helperTextEls.forEach((el) => mdc.textFieldHelperText.MDCTextFieldHelperText.attachTo(el))

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
// const radioEls = Array.from(mainEl.querySelectorAll('.mdc-radio'));
// radioEls.forEach((el) => new MDCRadio(el));

// // Switch
// const switchEls = Array.from(mainEl.querySelectorAll('.mdc-switch'));
// switchEls.forEach((el) => mdc.switch.MDCSwitch.attachTo(el))

// // Top app bar
// const topAppBarEls = Array.from(mainEl.querySelectorAll('.mdc-top-app-bar'));
// topAppBarEls.forEach((el) => new MDCTopAppBar(el));

// // List
// const listEls = Array.from(mainEl.querySelectorAll('.mdc-list'));
// listEls.forEach((el) => {
//   let list = new MDCList(el);
//   list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
//   list.singleSelection = true;
// });

// // Select
// const selectEls = Array.from(mainEl.querySelectorAll('.mdc-select'));
// selectEls.forEach((el) => new MDCSelect(el));

// // Snackbar
// const snackbarEl = mainEl.querySelector('.mdc-snackbar');
// new MDCSnackbar(snackbarEl);

// // Dialog
// const dialogEl = mainEl.querySelector('.mdc-dialog');
// new MDCDialog(dialogEl);

// // Slider
// const sliderEl = mainEl.querySelector('.mdc-slider');
// const slider = new MDCSlider(sliderEl);
// slider.value = 5;

// // Menu
// const menuEl = mainEl.querySelector('.mdc-menu');
// const menu = new MDCMenu(menuEl);
// menu.open = true;
// // Override MDCMenuSurfaceFoundation so the menu never closes
// menu.menuSurface_.foundation_.close = () => {};
// // Focus first component when menu is done opening if not in an iframe
// if (window.top === window) {
//   menuEl.addEventListener('MDCMenuSurface:opened', () => document.querySelector('.mdc-button').focus());
// }

// // Tabs
// const tabBarEl = mainEl.querySelector('.mdc-tab-bar');
// new MDCTabBar(tabBarEl);

// // Data Table
// const dataTable = document.querySelector('.mdc-data-table');
// new MDCDataTable(dataTable);
