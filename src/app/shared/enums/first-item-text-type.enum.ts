export enum FirstItemTextType {
    pleaseSelect = 1,
    all = 2,
    empty = 3,
}

export const firtsItemTextTypeDescriptions: Record<keyof typeof FirstItemTextType, string> = {
    pleaseSelect: 'Lütfen Seçiniz',
    all: 'Tümü',
    empty: ' ',
} 