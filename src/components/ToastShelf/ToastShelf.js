import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts = [], clearToast }) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ variant, content, id }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast
            variant={variant}
            content={content}
            id={id}
            onClear={clearToast}
          />
        </li>
      ))}
    </ol>
  );
}

export default React.memo(ToastShelf);
