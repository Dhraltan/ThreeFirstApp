export interface IndexData {
    timestamp: string | Date;
    BME680: {
      'temperature[*C]': number;
      'humidity[%]': number;
      'atmospheric_pressure[hPa]': number;
      'eCO2[ppm]': number;
      'bTVOC[ppm]': number;
      IAQ: number;
      IAQ_acc: number;
      sIAQ: number;
      sIAQ_acc: number;
    };
    CCS811: { 'ccs811_eCO2[ppm]': number; 'ccs811_eTVOC[ppb]': number };
    ZH03B: {
      'PM1.0[ug/m3]': number;
      'PM2.5[ug/m3]': number;
      'PM10[ug/m3]': number;
    };
    'Vibration[ms]': number;
}
