export enum UserType {
    admin = 1,
    user=2
    // patient = 2,
    // doctor = 3,
    // callCenter = 4,
    // assistant = 5,
    // guest = 6,
    // laborant = 7,
    // hospital = 8,
    // healthyLifestyle = 9
}

export const userTypeDescriptions: Record<keyof typeof UserType, string> = {
    admin: 'Admin',
    user:'User'
};
