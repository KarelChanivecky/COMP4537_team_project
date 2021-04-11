/**
 *
 * @param {string} candidate
 */
export function validateEmail(candidate) {
    let seenAt = false;
    let dotAfterAt = false;
    let endsWithDot = true;
    candidate.split('').forEach(c => {
        if (c === '@') {
            seenAt = true;
        }

        if (seenAt && c === '.') {
            dotAfterAt = true;
            endsWithDot = true;
        }

        if (dotAfterAt && c !== '.') {
            endsWithDot = false;
        }

        if (c === ' ') {
            return false;
        }
    });

    return !endsWithDot;
}

/**
 *
 * @param {string} candidate
 */
export function validatePassword(candidate){
    let hasNum = /\d/.test(candidate);
    let hasCap = /[A-Z]/.test(candidate);
    let hasLower = /[a-z]/.test(candidate);
    return hasCap && hasLower && hasNum && (8 <= candidate.length );
}