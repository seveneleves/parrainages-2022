window.onload = function () {
  var req = new XMLHttpRequest();
  req.responseType = "json";
  req.open(
    "GET",
    "https://seveneleves.github.io/parrainages-2022/data/parrainagestotal.json",
    true
  );
  req.onload = function () {
    // Charge la réponse json dans la variable res
    var res = req.response;
    // Crée un objet vide qui recevra la liste des candidats
    var candidats = [];
    // Itère sur la liste des parrainages res
    for (i = 0; i < res.length; i++) {
      var c = candidats.find((e) => e.nom === res[i].Candidat);
      // Si le candidat est déjà dans le tableau candidats
      if (c) {
        // Vérifie si un parrain du même département a déjà accordé son parrainage
        var d = c.parrains.find((e) => e.departement === res[i].Departement);
        // Si la vérification échoue, incrémente la propriété departements du candidat
        if (!d) {
          c.departements += 1;
        }
        c.parrainages += 1;
        c.parrains.push({
          circonscription: res[i].Circonscription,
          civilite: res[i].Civilite,
          mandat: res[i].Mandat,
          departement: res[i].Departement,
          nom: res[i].Nom,
          prenom: res[i].Prenom,
        });
        // Si le candidat n'est pas déjà dans le tableau candidats
      } else {
        // Crée l'objet et l'amorce avec 1 parrainage, 1 departement et 1 parrain
        candidats.push({
          nom: res[i].Candidat,
          parrainages: 1,
          departements: 1,
          parrains: [
            {
              circonscription: res[i].Circonscription,
              civilite: res[i].Civilite,
              mandat: res[i].Mandat,
              departement: res[i].Departement,
              nom: res[i].Nom,
              prenom: res[i].Prenom,
            },
          ],
        });
      }
    }
    console.log(candidats);
  };
  req.send();
};
