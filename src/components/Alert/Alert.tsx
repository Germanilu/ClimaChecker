import type { ReactNode } from "react";
import styles from './Alert.module.css'


/**
 * Alert Component
 * 
 * A simple, reusable component to display alert messages.
 * It wraps any content passed as children in a styled container.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {ReactNode} props.children - The content/message to be displayed inside the alert box.
 * 
 * @returns A styled div containing the alert message.
 * 
 * @example
 * <Alert>All fields are required</Alert>
 */
export default function Alert({children} : {children:ReactNode}) {
  return (
    <div className={styles.alert}>{children}</div>
  )
}
