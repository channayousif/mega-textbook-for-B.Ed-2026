/**
 * Label, hint and error wired to one input by id, so screen readers announce all
 * three. The child is a single input, select or textarea; its id and aria
 * attributes are set here.
 */
import React, { useId } from 'react';
import styles from './ui.module.css';

type Props = { label: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; children: React.ReactElement<{ id?: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean }> };

export default function FormField({ label, hint, error, children }: Props): React.ReactElement {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  const control = React.cloneElement(children, {
    id: children.props.id ?? id,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : undefined,
  });
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={children.props.id ?? id}>{label}</label>
      {hint && <p id={hintId} className={styles.fieldHint}>{hint}</p>}
      {control}
      {error && <p id={errorId} className={styles.fieldError} role="alert">{error}</p>}
    </div>
  );
}
