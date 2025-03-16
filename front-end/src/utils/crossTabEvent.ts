export function sendCrossTabEvent(eventName: string, data: any) {
  localStorage.setItem(eventName, JSON.stringify(data));

  // Optional: Remove the item to avoid clutter
  localStorage.removeItem(eventName);
}
