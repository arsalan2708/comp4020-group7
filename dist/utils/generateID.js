/**
 * generates a unique ID using current time in ms and a random number
 * @returns random ID eg. [l8m5x5g5v8p0sz1]
 */
export function generateID() {
    const currentTime = Date.now().toString(36);
    const randomInt = Math.random().toString(36).substring(2);
    return currentTime + randomInt;
}
