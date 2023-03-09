export enum Gender {
  male = 1,
  female = 2,
  notDefined = 3
}

export const genderDescriptions: Record<keyof typeof Gender, string> = {
  male: 'Erkek',
  female: 'Kadın',
  notDefined: 'Belirsiz'
};
