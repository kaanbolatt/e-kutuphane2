import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    encryptionKey = 'AnketBsv';
    institutions=new InstitutionsConstant();
}

class InstitutionsConstant {
    testKurumKodu = 10000038;
    capa = 900167;
  }