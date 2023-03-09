import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

// Zamanla İlgili Metodlarımızı Buraya Yazabiliriz.
export class DateHelper {

    constructor(private datePipe: DatePipe,) { }

    /**
     * @tanim Girilen Değerin Tarih Olup Olmadığını Kontrol Eder.
     * @param _date any tipinde
     */
    isDate(_date: any) {
        const _regExp = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');
        return _regExp.test(_date);
    }



    convertFormattedDate(date) {
        if (!this.isNullOrUndefined(date)) {
            if (date.toString().length > 10) {
                return this.datePipe.transform(date, 'dd.MM.yyyy');
            } else {
                return date;
            }
        }
    }

    convertFormattedDatetime(datetime) {
        return this.datePipe.transform(datetime, 'dd.MM.yyyy HH:mm:ss');
    }

    getTarihWithHourAndMinute(datetime: Date, saat: number, dakika: number): Date {
        datetime.setHours(saat);
        datetime.setMinutes(dakika);
        return datetime;
    }

 
    // apiden gelen dateleri calendere setlenecek hale getirir
    convertDateFromApiDate(apiDate) {
        if (this.isNullOrUndefined(apiDate)) {
            return null;
        } else {
            return new Date(Date.parse(apiDate));
        }
    }

    // iki tarih arasındaki farki milisaniye olarak geri döner
    tarihFarkiHesapla(baslangicTarihi: Date, bitisTarihi: Date) {
        return bitisTarihi.getTime() - baslangicTarihi.getTime();
    }

    tarihAralikHesaplaAyBuyuklukKontrol(aySayisi: number, baslangicTarihi: Date, bitisTarihi: Date) {
        const ay = Math.abs(12 * (baslangicTarihi.getFullYear() - bitisTarihi.getFullYear()) + baslangicTarihi.getMonth() - bitisTarihi.getMonth() + (baslangicTarihi.getDate() >= bitisTarihi.getDate() ? 0 : -1));
        if (ay > aySayisi) {
            return true;
        }
        return false;
    }

    /**
     * @tanim Gönderilen tarihe ay ekler
     * @tanim Geçmişe eklemek için (-eklenecekAy)
     * @tanim İleriye eklemek için (+eklenecekAy)
     * @param tarih
     * @param eklenecekAy
     */
    addMonthToDate(tarih: Date, eklenecekAy: number) {
        return new Date(tarih.setMonth(tarih.getMonth() + eklenecekAy));
    }

    /**
     * @tanim Gönderilen tarihe gün ekler
     * @tanim Geçmişe eklemek için (-eklenecekGun)
     * @tanim İleriye eklemek için (+eklenecekGun)
     * @param tarih
     * @param eklenecekAy
     */
    addDayToDate(tarih: Date, eklenecekGun: number) {
        return new Date(tarih.setDate(tarih.getDate() + eklenecekGun));
    }

    /**
     * @tanim Şimdiki tarihe ay ekler.
     * @tanim Geçmişe eklemek için (-eklenecekAy)
     * @tanim İleriye eklemek için (+eklenecekAy)
     * @param eklenecekAy
     */
    addMonthToDateNow(eklenecekAy: number) {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth()+1 + eklenecekAy, now.getDate(), 0, 0, 0);
    }

    /**
     * @tanim iki tarihi karşılaştırır.
     * @tanim birinci tarih büyükse 1
     * @tanim ikinci tarih büyükse 2
     * @tanim iki tarih eşitse 0 döner
     * @param firtsDate
     * @param secondDate
     */
    compareTwoDates(firtsDate: Date, secondDate: Date) {
        if (firtsDate.getTime() > secondDate.getTime()) {
            return 1;
        } else
            if (firtsDate.getTime() < secondDate.getTime()) {
                return 2;
            } else {
                return 0;
            }
    }

    /**
     * @tanim İki tarih arasındaki gün sayısını verir.
     * @param firstDate Date tipinde
     * @param secondDate Date tipinde
     */
    dateDifferenceIndays(firstDate: Date, secondDate: Date) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;

        const utc1 = Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
        const utc2 = Date.UTC(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    isNullOrUndefined(obj: any) {
        if (obj === undefined || obj === null || obj === '' || obj === ' ') {
          return true;
        } else {
          return false;
        }
      }
}
