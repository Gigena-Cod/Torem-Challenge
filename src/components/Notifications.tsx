import { toast } from 'react-toastify';

export const NotificationSuccess = (text: string) => {
  return toast.success(text, {
    autoClose: 5000,
    position: toast.POSITION.BOTTOM_LEFT,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  });
};
export const NotificationFailure = (text: string) => {
  return toast.error(text, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  });
};
export const NotificationWarning = (text: string) => {
  return toast.warning(text, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  });
};
