export function regraDe3(x: number, paraX: number, y: number): number {
    return (paraX * y) / x;
}

export function calcEquivalentPosition(
    newWidth: number,
    newHeight: number,
    oldWidth: number,
    oldHeight: number,
    x: number,
    y: number
): { x: number; y: number } {
    const newX = regraDe3(newWidth, x, oldWidth);
    const newY = regraDe3(newHeight, y, oldHeight);

    return { x: newX, y: newY };
}
