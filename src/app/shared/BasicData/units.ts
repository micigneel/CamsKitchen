
export class UnitInt{
  constructor(
    public label : string,
    public key : string
  ){}
}

export const units : UnitInt[]  = [
  new UnitInt('liter (l)' , 'l'),
  new UnitInt('decilitre (dL)' , 'dl'),
  new UnitInt('gallon (g)' , 'g'),
  new UnitInt('pound (lb)' , 'lb'),
  new UnitInt('ounce (oz)' , 'oz'),
  new UnitInt('milligram (mg)' , 'mg'),
  new UnitInt('gram (g)' , 'g'),
  new UnitInt('kilogram (kg)' , 'kg'),
  new UnitInt('millimeter (mm)' , 'mm'),
  new UnitInt('centimeter (cm)' , 'cm'),
  new UnitInt('meter (m)' , 'm'),
  new UnitInt('inch (i)' , 'i'),
  new UnitInt('dozen (dz)' , 'dz')
];


{

}
