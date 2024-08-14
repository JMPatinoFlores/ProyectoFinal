export function generateUniqueRandomNumbers(nIni: number, nEnd: number, quantity: number): number[] {
    const numbers = new Set<number>();

    while (numbers.size < quantity) {
        const randomNum = Math.floor(Math.random() * (nEnd - nIni + 1)) + nIni;
        numbers.add(randomNum);
    }

    return Array.from(numbers);
}
