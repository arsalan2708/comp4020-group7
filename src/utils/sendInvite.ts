import { generateID } from "./generateID.js";
import { getUser } from "./getUser.js";

/**
 * Pulls up the default mail client to share list
 */
export function sendEmail() {
  const recipient = "example@example.com"; // Recipient email address
  const subject = "Join Our Shared Grocery List!";
  const body = `Hi,

  I've created a shared grocery list and would love for you to join. You can add items and stay updated on what's needed.
  
  List ID: ${generateID()}
  
  Follow these instructions to join this list:
  1. Copy list ID
  2. Log into your account at ${window.location.href}
  3. Open sidebar
  4. Tap 'Join List"
  5. Enter list ID
  6. Tap "Submit"
 
  
  Let me know if you have any questions!
  
  Best,
  ${getUser().userName}`;

  const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink; // Open the default email client
}
