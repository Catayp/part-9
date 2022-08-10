interface resultadoEjercicio {
  numeroDiasObjetivo: number;
  numeroDiasEntrenar: number;
  objetivo: number;
  promedio: number;
  metaAlcanzada: boolean;
  calificacion: number;
  explicacion: string;
}
 export const calculateExercises = (horaDiaria: number[], metaHora: number): resultadoEjercicio | string => {

  if (horaDiaria.length !== 7) {
    return 'debe ingresar el numero de horas diarias de todos los dias de la semana';
  }

  // const sumaHorasMeta: number = metaHora.reduce((acumulador, elemento) => acumulador + elemento);
  const sumaHorasEntrenar: number = horaDiaria.reduce((acumulador, elemento) => acumulador + elemento);
  const numeroDiasObjetivo = 7;
  const arrDias: number[] = horaDiaria.filter(Element => Element > 0);
  const numeroDiasEntrenar: number = arrDias.length;
  const promedio: number = sumaHorasEntrenar/horaDiaria.length;
  let metaAlcanzada = false; 
  let calificacion: number;
  let explicacion: string;

  switch (true) {
    case metaHora <= promedio:
      metaAlcanzada = true;
      calificacion = 3;
      explicacion = `cumplio con la meta, felicidades! tu promedio de horas al dia fue ${promedio}`;
      break;
    case metaHora > promedio && promedio >= metaHora/2:
      calificacion = 2;
      explicacion = `falto un poco para alcanzar la meta, pero, casi lo logras! tu promedio de horas al dia fue ${promedio}`;
      break;
    case metaHora > promedio && promedio < metaHora/2:
      calificacion = 1;
      explicacion = `No alcanzaste la meta, necesitas esforzarte mas!  tu promedio de horas al dia fue ${promedio}`;
      break;
    default: 
      return 'debe ingresar numeros correspondientes mayores o iguales a 0 ';
  }
  return {
    numeroDiasObjetivo,
    numeroDiasEntrenar,
    objetivo: metaHora,
    promedio,
    metaAlcanzada,
    calificacion,
    explicacion
  };
};
// const horaDiaria: number[] = [];
// process.argv.forEach((element, index) => {
//   if (index > 1) horaDiaria.push(Number(element));
// });
// const metaHora = 3;
// console.log(calculateExercises(horaDiaria, metaHora));
