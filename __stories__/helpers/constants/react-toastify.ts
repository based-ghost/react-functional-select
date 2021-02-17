import { cssTransition, ToastContainerProps } from 'react-toastify';

// CSS transition config => 'transition' property
const transition = cssTransition({
  enter: 'Toastify__animate__bounceIn',
  exit: 'Toastify__animate__bounceOut'
});

// ToastContainerProps passed to the toast.configure() method
export const TOAST_CONTAINER_PROPS: ToastContainerProps = {
  transition,
  autoClose: 2500,
  draggable: false,
  newestOnTop: true,
  position: 'top-right'
};