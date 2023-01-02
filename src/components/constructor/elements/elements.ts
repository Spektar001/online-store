export function createEl(classList: string, element = 'div'): HTMLElement {
    const el = document.createElement(element);
    el.classList.add(...classList.split(' '));
    return el;
}

export function appendEl(parent: HTMLElement, element: HTMLElement): void {
    parent.append(element);
}
