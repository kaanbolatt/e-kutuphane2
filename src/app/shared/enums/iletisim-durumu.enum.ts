export enum IletisimDurumuEnum {
    yeni = 1,
    tamamlandi = 2
}

export const iletisimDurumuDescriptions: Record<keyof typeof IletisimDurumuEnum, string> = {
    yeni: 'Yeni',
    tamamlandi: 'Tamamlandı'
};
