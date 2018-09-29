export const ACTION_MAKE_TOAST = 'ACTION_MAKE_TOAST';
let i = 1;
export const actionMakeToast = (toastType, toastMsg) => ({
  type: ACTION_MAKE_TOAST,
  newToast: {
    type: toastType,
    msg: toastMsg,
    key: ++i
  }
});