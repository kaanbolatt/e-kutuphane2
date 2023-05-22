export enum LanguageEnum {
    turkish = 1,
    english = 2,
}

export const languageEnumDescriptions: Record<keyof typeof LanguageEnum, string> = {
    turkish: 'Türkçe',
    english: 'İngilizce'
};