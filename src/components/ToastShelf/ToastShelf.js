import React from "react";

import Toast from "../Toast";
import { useToasts } from "../../providers/ToastsProvider";

import styles from "./ToastShelf.module.css";

function ToastShelf() {
  const { toasts, removeToast } = useToasts();

  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ variant, content, id }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast
            variant={variant}
            content={content}
            id={id}
            onClear={removeToast}
          />
        </li>
      ))}
    </ol>
  );
}

export default React.memo(ToastShelf);
