import { toast } from 'react-hot-toast';
import { toastDarkStyle } from './GlobalStyle';

class Toast {
  static success(message: string) {
    toast.success(message, toastDarkStyle());
  }

  static error(message: string) {
    toast.error(message, toastDarkStyle());
  }

  static promise(
    promise: Promise<any>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: (response: any) => string;
      error: (error: any) => string;
    }
  ) {
    return toast.promise(
      promise,
      {
        loading,
        success,
        error,
      },
      toastDarkStyle()
    );
  }
}

export default Toast;
