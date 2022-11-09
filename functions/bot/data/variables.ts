export const welcomeMessage = `¡Bienvenido!
Soy el *joserrabot* 💪
A través de este bot podrás:

Conocer los horarios de los autobuses de Murcia 🚌
Conocer el estado del tiempo ☀
Recibir avisos de cumpleaños 🎂

Si quieres conocer los comandos con
más detalle, usa /help 🆘`;

export const helpMessage = `
🆘 Si no sabes cómo usar el *joserrabot*
aquí tienes una lista de los comandos
más importantes 🆘:

*Comandos básicos*
/start - Iniciar el bot
/help - Ayuda sobre el bot

*Comandos avanzados*
/bus - Horarios de autobuses
/tiempo - Conoce el tiempo en Murcia
/birth - Cumpleaños de amigos

*Comandos de gestión*
/invite - Genera un link de invitación`;

export const birthdaysMessage = `
*🎂 cumpleaños 🎂*

*Joserra* - 30 de octubre de 1991
*Jorge* - 26 de abril de 1991
*Pedro* - 15 de marzo de 1991
*Juan Luis* - 2 de abril de 1991
*Manu* - 19 de diciembre de 1991
*Camacho* -
*Fran* -
*Serrano* 25 de diciembre de 1992
*Toni* - `;

export const weatherMessage = `
Puedo decirte qué tiempo hace en cualquier
parte del mundo, así como mostrarte la
previsión futura.

🚩 Para empezar, envíame una ubicación o
escríbeme el nombre de la ciudad y el país.
`;

export const forecastMessage = (
  city: string,
  country: string,
  temp: number,
  icon: string
): string => {
  return `En *${city}*, *${country}* la temperatura es de: ${temp} °C y está ${icon}.

Para una previsión del tiempo más detallada, usa uno de los comandos que aparecen en el Menú del Bot de abajo`;
};
