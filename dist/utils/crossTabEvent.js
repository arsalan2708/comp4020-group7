export function sendCrossTabEvent(eventName, data) {
    localStorage.setItem(eventName, JSON.stringify(data));
    // Optional: Remove the item to avoid clutter
    localStorage.removeItem(eventName);
}
