export const hudInformation = [
  {
    title: 'Basic views',
    buttons: [
      { title: 'Normal color view', id: 'normal_color' },
      { title: 'Grayscale view', id: 'grayscale_color' },
      { title: 'Vibrations', id: 'vibrations_color' },
    ],
  },
  {
    title: 'Measured by BME680',
    buttons: [
      { title: 'Temperature', id: 'bme680_temperature_color' },
      { title: 'Atmospheric pressure', id: 'bme680_atm_color' },
      { title: 'Estimated CO2', id: 'bme680_eco2_color' },
      { title: 'Total concentration of VOC', id: 'bme680_tvoc_color' },
      { title: 'IAQ', id: 'bme680_iaq_color' },
      { title: 'Subjective IAQ', id: 'bme680_siaq_color' },
    ],
  },
  {
    title: 'Measured by CCS811',
    buttons: [
      { title: 'Estimated CO2', id: 'ccs811_eco2_color' },
      { title: 'Total concentration of VOC', id: 'ccs811_tvoc_color' },
    ],
  },
  {
    title: 'Measured by ZH03B',
    buttons: [
      { title: 'Particle Matter of 1.0ug', id: 'zh03b_pm1_color' },
      { title: 'Particle Matter of 2.5ug', id: 'zh03b_pm2.5_color' },
      { title: 'Particle Matter of 10ug', id: 'zh03b_pm10_color' },
    ],
  },
];
