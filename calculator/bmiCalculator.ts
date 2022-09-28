interface resultadoBmi {
 weight: number,
 height: number,
 bmi: string
}
export const calculatorBmi = (masa: number, altura: number): resultadoBmi => {
  if ( !masa || !altura ) throw new Error(' debe ingresar numeros correspondientes mayores a 0 ');

  altura /= 100;

  const result: number =  masa/(altura * altura);
  let healthy: string;

  switch(true){
    case result < 16.0 : 
      healthy = ' bajo peso, severo (mala salud)';
      break;
    case result >= 16.0 && result <= 16.9:
      healthy = 'bajo peso, moderado (salud por mejorar)';
      break; 
    case result >= 17.0 && result <= 18.4:   
      healthy = 'bajo de peso, leve (salud por mejorar)';
      break; 
    case result >= 18.5 && result <= 24.9: 
      healthy = 'normal (buena salud)';
      break; 
    case result >= 25.0 && result <= 29.9:  
      healthy = ' sobrepeso, pre-obeso (salud por mejorar)';
      break;
    case result >= 30.0 && result <= 34.9:  
      healthy = 'obeso, clase I (salud por mejorar)';
      break; 
    case result >= 35.0 && result <= 39.9:   
      healthy = 'obeso, clase II (mala salud)';
      break; 
    case result >= 40.0:   
      healthy = 'obeso, clase III (mala salud)';
      break;
    default:
      healthy = 'error contacte con el administrador';
    
  }
   return {
    height: altura,
    weight: masa,
    bmi: `${result}. estando en la categoria: ${healthy} `,
  };
};
// const n1 = Number(process.argv[2]);
// const n2 = Number(process.argv[3]);
// try {
//   console.log(calculatorBmi(n1, n2));
// } catch (error) {
//   console.log(error.message);
// }
