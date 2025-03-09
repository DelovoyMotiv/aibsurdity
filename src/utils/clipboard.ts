
import { toast } from "sonner";

/**
 * Utility function to copy text to clipboard and show toast notification
 * @param text - Text to copy to clipboard
 * @param successMessage - Message to display on successful copy
 */
export const copyToClipboard = (text: string, successMessage: string = "Copied to clipboard!") => {
  if (!navigator.clipboard) {
    toast.error("Clipboard API not available in your browser");
    return;
  }
  
  navigator.clipboard.writeText(text)
    .then(() => {
      toast.success(successMessage);
    })
    .catch((err) => {
      toast.error("Failed to copy: " + err.message);
      console.error("Failed to copy text: ", err);
    });
};
