export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    // Math.random() returns a number in range [0, 1)
    // Math.floor(Math.random() * (max - min + 1)) returns a number in range [0, max - min + 1)
    // getRandomInt returns a number in range [min, max + 1) or [min, max]
}

export function getDigit(num, i) {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

export function mostDigits(nums) {
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, nums[i].toString().length);
    }
    return maxDigits;
}

export function awaitTimeout(timeout) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true)
		}, timeout)
	})
}