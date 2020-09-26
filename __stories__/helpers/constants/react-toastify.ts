import { ToastContainerProps } from 'react-toastify';

// ToastContainerProps passed to the toast.configure() method
export const TOAST_CONTAINER_PROPS: ToastContainerProps = {
  autoClose: 2500,
  draggable: false,
  newestOnTop: true,
  position: 'top-right'
};