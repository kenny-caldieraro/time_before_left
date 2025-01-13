const express = require('express');
const moment = require('moment');
const app = express();

app.use(express.json());

app.post('/temps-restant', (req, res) => {
  const maintenant = moment();
  const finJournee = moment().set({ hour: 17, minute: 0, second: 0 });
  
  // Si on est après 17h, on calcule pour le lendemain
  if (maintenant.isAfter(finJournee)) {
    finJournee.add(1, 'day');
  }

  const duree = moment.duration(finJournee.diff(maintenant));
  const heures = Math.floor(duree.asHours());
  const minutes = duree.minutes();
  const secondes = duree.seconds();

  const message = `La journée se termine dans ${heures} heure${heures > 1 ? 's' : ''}, ${minutes} minute${minutes > 1 ? 's' : ''} et ${secondes} seconde${secondes > 1 ? 's' : ''}`;

  res.json({
    response_type: 'in_channel',
    text: message,
    attachments: [
      {
        text: "⏰ Temps restant avant 17h"
      }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});