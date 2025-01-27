import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ content, variant, id, onClear }) {
  const Icon = ICONS_BY_VARIANT[variant];
  const clearToast = () => onClear(id);

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>{<Icon size={24} />}</div>
      <p className={styles.content}>{content}</p>
      <button
        className={styles.closeButton}
        onClick={clearToast}
        data-testid={`remove-toast-${variant}`}
      >
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default React.memo(Toast);
