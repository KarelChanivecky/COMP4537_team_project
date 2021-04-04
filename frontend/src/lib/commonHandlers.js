/**
 * Handle updating a string state

 * @param {function(string)} setString
 */
export function handleStringChange(setString) {
    /**
     * @param {event} ev
     */
    return (ev) => setString(ev.target.value);
}