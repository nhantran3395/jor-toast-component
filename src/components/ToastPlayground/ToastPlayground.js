import React from "react";
import { produce } from "immer";

import Button from "../Button";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

const initialToasts = [];

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

const initialMessage = "";
const initialVariant = "notice";

function ToastPlayground() {
  const [message, setMessage] = React.useState(initialMessage);
  const [variant, setVariant] = React.useState(initialVariant);
  const [toasts, dispatchToasts] = React.useReducer(
    toastsReducer,
    initialToasts
  );

  const onMessageChange = (event) => setMessage(event.target.value);

  const onVariantChange = (event) => setVariant(event.target.value);

  const resetInput = () => {
    setMessage(initialMessage);
    setVariant(initialVariant);
  };

  const onSubmitToast = (event) => {
    event.preventDefault();
    resetInput();
    dispatchToasts({ type: "add", payload: { content: message, variant } });
  };

  const removeToast = React.useCallback((id) => {
    dispatchToasts({ type: "remove", payload: { id } });
  }, []);

  return (
    <form className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} clearToast={removeToast} />

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              onChange={onMessageChange}
              value={message}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => (
              <label key={option} htmlFor={`variant-${option}`}>
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name="variant"
                  value={option}
                  checked={option === variant}
                  onChange={onVariantChange}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={onSubmitToast}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ToastPlayground;
