import * as React from 'react';
export const navigationRef = React.createRef();
export const toastRef = React.createRef();
export const loaderRef = React.createRef();
const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};
const goBack = () => {
  if (navigationRef.current?.goBack()) {
    navigationRef.current?.goBack();
  }
};
function popAll() {
  navigationRef.current?.popToTop();
}
const showToast = (msg) => {
  toastRef?.current?.show(msg);
};

const showLoader = (isCancelable = true) => {
  loaderRef?.current?.show(isCancelable);
};

const hideLoader = () => {
  loaderRef?.current?.hide();
};

export default {
  hideLoader,
  showLoader,
  showToast,
  popAll,
  goBack,
  navigate,
};
