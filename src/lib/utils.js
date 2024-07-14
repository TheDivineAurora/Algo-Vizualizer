function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    // Math.random() returns a number in range [0, 1)
    // Math.floor(Math.random() * (max - min + 1)) returns a number in range [0, max - min + 1)
    // getRandomInt returns a number in range [min, max + 1) or [min, max]
}