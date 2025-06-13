// src/utils/snackbar.ts
import { SnackbarMessage, OptionsObject, VariantType, useSnackbar } from 'notistack';
import { useEffect } from 'react';

let useSnackbarRef: (msg: SnackbarMessage, options?: OptionsObject) => void;

export const SnackbarUtilsConfigurator = () => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    useSnackbarRef = enqueueSnackbar;
  }, [enqueueSnackbar]);

  return null;
};

export const snackbar = {
  toast(msg: SnackbarMessage, variant: VariantType = 'default', options: OptionsObject = {}) {
    useSnackbarRef?.(msg, { variant, ...options });
  },
  success(msg: SnackbarMessage, options?: OptionsObject) {
    useSnackbarRef?.(msg, { variant: 'success', ...options });
  },
  error(msg: SnackbarMessage, options?: OptionsObject) {
    useSnackbarRef?.(msg, { variant: 'error', ...options });
  },
  info(msg: SnackbarMessage, options?: OptionsObject) {
    useSnackbarRef?.(msg, { variant: 'info', ...options });
  },
  warning(msg: SnackbarMessage, options?: OptionsObject) {
    useSnackbarRef?.(msg, { variant: 'warning', ...options });
  },
};
