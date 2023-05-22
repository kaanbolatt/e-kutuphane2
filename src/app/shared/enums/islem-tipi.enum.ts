export enum IslemTipi {
    yeniKayit = 0,
    guncelleme = 1,
}

export const islemTipiEnumTanimlari: Record<keyof typeof IslemTipi, string> = {
    yeniKayit: 'Yeni Kayıt',
    guncelleme: 'Güncelleme',

};

