import { EventType } from "../types/types";

export function sendCrossTabEvent(eventName: EventType, data: any) {
  localStorage.setItem(eventName, JSON.stringify(data));

  // Optional: Remove the item to avoid clutter
  localStorage.removeItem(eventName);
}
