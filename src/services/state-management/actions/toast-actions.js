import {TOAST_TYPES} from "../../../constants/toast";

export const ACTION_MAKE_TOAST = 'ACTION_MAKE_TOAST';
let i = 1;

export const actionMakeToast = (toastType, toastMsg, duration) => ({
  type: ACTION_MAKE_TOAST,
  newToast: {
    type: toastType,
    msg: toastMsg,
    key: ++i,
    duration: duration || 3000,
  }
});

export const actionMakeSuccessToast = (toastMsg) => actionMakeToast(TOAST_TYPES.SUCCESS, toastMsg);
export const actionMakeErrorToast = (toastMsg) => actionMakeToast(TOAST_TYPES.ERROR, toastMsg);
export const actionMakeInfoToast = (toastMsg) => actionMakeToast(TOAST_TYPES.INFO, toastMsg);
export const actionMakeWarningToast = (toastMsg) => actionMakeToast(TOAST_TYPES.WARNING, toastMsg);