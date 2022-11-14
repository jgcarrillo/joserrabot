export const welcomeMessage = `¡Bienvenido\\!
Soy el *joserrabot* 💪
A través de este bot podrás:

Conocer los horarios de los autobuses de Murcia 🚌
Conocer el estado del tiempo ☀
Establecer avisos personalizados 🎂

Si quieres conocer los comandos con
más detalle, usa /help 🆘`;

export const helpMessage = `
🆘 Si no sabes cómo usar el *joserrabot*
aquí tienes una lista de los comandos
más importantes 🆘:

*Comandos básicos*
/start \\- Iniciar el bot
/help \\- Ayuda sobre el bot

*Comandos avanzados*
/tiempo \\- Conoce el tiempo mundial
/recordatorio \\- Añade un recordatorio
/bus \\- Horarios de autobuses

*Comandos de gestión*
/invitar \\- Genera un link de invitación`;

export const reminderMessage = `
*✅ Recordatorios ✅*

¿Qué quieres hacer?:
/crear \\- Crear un nuevo recordatorio
/listar \\- Listar todos mis recordatorios
/eliminar \\- Eliminar un recordatorio
`;

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
escríbeme el nombre de la ciudad y el país
con el formato ciudad/tiempo, por ejemplo:
Madrid/tiempo o Roma/tiempo.
`;

export const forecastMessage = (
  city: string,
  country: string,
  temp: number,
  icon: string
): string => {
  return `En *${city}*, *${country}* la temperatura es de: ${temp} °C, ${icon}

Para una previsión del tiempo más detallada, usa uno de los comandos que aparecen en el Menú del Bot de abajo.`;
};

export const defaultMessage = `
El Joserrabot no es capaz de entener lo que dices, prueba a escribir /start para ver los comandos disponibles.

Si estás intentando conocer el tiempo de algún lugar, revisa antes el comando /tiempo para ver el formato.
`;
