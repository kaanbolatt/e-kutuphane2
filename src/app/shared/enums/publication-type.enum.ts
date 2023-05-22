/* eslint-disable @typescript-eslint/naming-convention */
export enum PublicationTypeEnum {
    TumYayinlar = 1,
    Kitap = 2,
    Dergi = 3,
    Makale = 4,
}

export const publicationTypeEnumDescriptions: Record<keyof typeof PublicationTypeEnum, string> = {
    TumYayinlar: 'Tüm Yayınlar',
    Kitap: 'Kitap',
    Dergi: 'Dergi',
    Makale: 'Makale'
};
