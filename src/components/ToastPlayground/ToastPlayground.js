import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";
import { useToasts } from "../../providers/ToastsProvider";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

const initialMessage = "";
const initialVariant = "notice";

function ToastPlayground() {
  const [message, setMessage] = React.useState(initialMessage);
  const [variant, setVariant] = React.useState(initialVariant);

  const onMessageChange = (event) => setMessage(event.target.value);

  const onVariantChange = (event) => setVariant(event.target.value);

  const { addToast } = useToasts();

  const resetInput = () => {
    setMessage(initialMessage);
    setVariant(initialVariant);
  };

  const onSubmitToast = (event) => {
    event.preventDefault();
    resetInput();
    addToast({ content: message, variant });
  };

  return (
    <form className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

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
