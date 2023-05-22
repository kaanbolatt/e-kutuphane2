export enum UserType {
    Admin = 1,
    Editor = 2,
    Yazar = 3,
    User = 4
}

export const userTypeDescriptions: Record<keyof typeof UserType, string> = {
    Admin: 'Admin',
    Editor:'Editor',
    Yazar:'Yazar',
    User:'User',
};


