<script setup>
//import des éléments utiles de vue
import { reactive, ref, onMounted } from "vue";
// Import d'un graphique type doughnut
import { Doughnut } from "vue-chartjs";
// import des objets du graphique de la bibliothèque ChartJS
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

//propriétés du graphique utilisés dans le template (props)
// on définit pour chacune son type de données et sa valeur par défaut
// on peut utiliser une grande variété de types, voire des objets

const propChart = defineProps({
  chartId: { type: String, default: "doughnut-chart" },
  datasetIdKey: { type: String, default: "label" },
  width: { type: Number, default: 500 },
  height: { type: Number, default: 500 },
  cssClasses: { type: String, default: "" },
  styles: { type: Object, default: () => {} },
  plugins: { type: Object, default: () => {} },

  //données du graphe
});

const chartData = reactive({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    },
  ],
});

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
});

//null au départ (important)
let liste = ref(null);

//liste des region
let lesregion = [];

//tableau nb de festival par region
let lstNb = [];

//Au montage du composant
onMounted(async () => {
  await fetch(
    "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=festivals-global-festivals-_-pl&q=&lang=fr&rows=500&facet=region_principale_de_deroulement&facet=departement_principal_de_deroulement&facet=commune_principale_de_deroulement&facet=discipline_dominante"
  )
    //Réponse demandée en json
    .then((response) => response.json())
    //récup de la réponse
    .then((response) => {
      liste = response;
      //On vérifie dans la console l'obtention des résultats
      console.log("response liste", liste);

      //Parcours de la liste des villageois
      // pour placer les spécialités dans un set
      // Permet d'éliminer les doublons

      let setSp = new Set();

      liste.forEach((dept) => {
        setSp.add(dept.departement_principal_de_deroulement.name);
      });

      console.log("setSp contenu : ", setSp);

      // Récupération des valeurs du set dans un tableau
      chartData.labels = Array.from(setSp);
      //Tri du tableau par ordre alphabétique
      chartData.labels.sort();

      //calcul du nombre de villageois par specialité
      let cpt = [];

      //Parcours des spécialités
      chartData.labels.forEach(function (spe) {
        //Initialisation du nombre pour la specialité en cours
        let nb = 0;

        //parcours de la liste des villageois
        liste.forEach((dept) => {
          //si c'est la bonne spécialité
          //on compte +1
          if (spe == dept.departement_principal_de_deroulement.name) {
            nb++;
          }
        });
        //on place le nb de villageois de cette spécialité
        //dans le tableau de comptage
        cpt.push(nb);
      });
      //on transfert le tableau de comptage dans les data
      chartData.datasets[0].data = cpt;

      //Calcul des couleurs et bordures
      let bgColor = [];
      let bdColor = [];

      //pour chaque valeur existante
      cpt.forEach(function (val) {
        //on calcul la couleur du secteur
        let c1 = couleur(0, 255);
        let c2 = couleur(0, 255);
        let c3 = couleur(0, 255);
        let tr = 0.5;

        //couleur avec transparence
        let color = "rgba(" + [c1, c2, c3, tr].join(",") + ")";
        bgColor.push(color);

        //Bordure sans transparence

        let border = "rgba(" + [c1, c2, c3].join(",") + ")";
        bdColor.push(color);
      });
      console.log("border", border);
      //chargement des couleurs et des bordures
      chartData.datasets[0].backgroundColor = bgColor;
      chartData.datasets[0].borderColor = bdColor;
    })
    .catch((error) => console.log("erreur Ajax donner non afficher "));
});

//Fonction de calcul aléatoire des couleurs
const couleur = (min, max) => {
  return Math.floor(Math.random() * (max - min));
};
</script>

<template>
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<style scoped></style>
