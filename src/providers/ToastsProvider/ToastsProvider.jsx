import React from "react";
import { produce } from "immer";

const initialToasts = [];

const ToastContext = React.createContext({
  toasts: initialToasts,
  addToasts: (id) => {},
  removeToast: ({ content, variant }) => {},
});

export function useToasts() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("must be used inside provider");
  return context;
}

function toastsReducer(toasts, { type, payload }) {
  return produce(toasts, (draft) => {
    switch (type) {
      case "add": {
        draft.push({ ...payload, id: crypto.randomUUID() });
        break;
      }
      case "remove": {
        const placement = draft.findIndex((toast) => toast.id === payload.id);
        if (placement === -1) {
          throw new Error("cannot remove element with invalid id");
        }
        draft.splice(placement, 1);
        break;
      }
      default: {
        throw new Error("action type is invalid");
      }
    }
  });
}

function ToastsProvider({ children }) {
  const [toasts, dispatchToasts] = React.useReducer(
    toastsReducer,
    initialToasts
  );

  const addToast = React.useCallback(
    ({ content, variant }) =>
      dispatchToasts({
        type: "add",
        payload: { content, variant },
      }),
    []
  );

  const removeToast = React.useCallback((id) => {
    dispatchToasts({ type: "remove", payload: { id } });
  }, []);

  const value = React.useMemo(() => {
    return {
      toasts,
      addToast,
      removeToast,
    };
  }, [toasts, addToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastsProvider;
