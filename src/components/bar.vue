<script setup>
// l'apport des élément vue

import { reactive, ref, onMounted } from "vue";

//imprt d'un type de graphiqe de type bartchat

import { Bar } from "vue-chartjs";

//import objet du graphique de la bibliotheque chartejs
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

// Element utilisé par le graphique
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

//propriété du graph utilisé dans le template
//on défini pour chaccune son type et donner sa valeur par défaut
//on peut aussi utiliser une grande varieter de types voire des objets

const propChart = defineProps({
  chartId: { type: String, default: "bar-chart" },
  datasetIdKey: { type: String, default: "label" },
  width: { type: Number, default: 100 },
  height: { type: Number, default: 50 },
  cssClasses: { type: String, default: "" },
  styles: { type: Object, default: () => {} },
  plugins: { type: Object, default: () => {} },
});

//donée injecter dans le graph
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



//Option Graphiques
//les principales utiliser ils en existes d'autre
//voir documentation
let chartOptions = reactive({
  //Aspect responsive du graphique
  responsive: true,
  //maintien ratio
  maintainAspectRation: false,

  //tye de projevtion utilisé
  //x vertical
  //y horizontale
  indexAxis: "x",

  //echelles du graph
  scales: {
    //axes ordonnées
    y: {
      //valeurs max y
      suggestedMax: 50,
      ticks: {
        //police
        font: {
          size: 16,
        },
      },

      //valeurs max x
    },
    //axes absicise
    x: {
      //valeurs max y
      suggestedMax: 100,
      ticks: {
        //police
        font: {
          size: 16,
        },
      },
    },
  },

  //les plugins
  plugins: {
    //légendes des données
    //label des données
    labels: {
      color: "pink",

      font: {
        size: 24,
      },
    },
    title: {
      //affichage du titre
      display: true,
      //libellé
      text: "Chart-JS Barchat",
      //couleur texte
      color: "red",
      //police texte
      font: {
        size: 18,
      },
    },
  },

  
},
 onMounted(async() => {
            await fetch('https://data.culture.gouv.fr/api/records/1.0/search/?dataset=festivals-global-festivals-_-pl&q=&lang=fr&rows=500&facet=region_principale_de_deroulement&facet=discipline_dominante&facet=commune_principale_de_deroulement&facet=discipline_dominante')
            //Réponse demandée en json
            .then(response => response.json ())
            //récup de la réponse
            .then(response => {
                liste = response;
                //On vérifie dans la console l'obtention des résultats
                console.log ("response liste", liste);

           
            //Parcours de la liste des villageois
            // pour placer les spécialités dans un set
            // Permet d'éliminer les doublons
    
            let setSp = new Set();

            liste.forEach ( (genre) => {
          setSp.add(genre.discipline_dominante.discipline_dominante)

            })

            console.log ("setSp contenu : ", setSp);
        
            // Récupération des valeurs du set dans un tableau
            chartData.labels=Array.from(setSp);
            //Tri du tableau par ordre alphabétique
            chartData.labels.sort();

            //calcul du nombre de villageois par specialité
            let cpt = [];

            //Parcours des spécialités
            chartData.labels.forEach(function(spe){
                //Initialisation du nombre pour la specialité en cours
                let nb = 0

                //parcours de la liste des villageois
                liste.forEach ( (genre) => {
                    //si c'est la bonne spécialité
                    //on compte +1
                    if (spe == genre.discipline_dominante.discipline_dominante){
                        nb++
                    }
                })
                //on place le nb de villageois de cette spécialité
                //dans le tableau de comptage
                cpt.push(nb);
            })
            //on transfert le tableau de comptage dans les data
            chartData.datasets[0].data = cpt;

            //Calcul des couleurs et bordures
            let bgColor = [];
            let bdColor = [];

            //pour chaque valeur existante
            cpt.forEach (function(val){
                //on calcul la couleur du secteur
                let c1 = couleur (0,255)
                let c2 = couleur (0,255)
                let c3 = couleur (0,255)
                let tr = 0.5

                //couleur avec transparence
                let color = 'rgba(' + [c1,c2,c3,tr].join(',')+")"
                bgColor.push(color)

                //Bordure sans transparence

                let border = 'rgba(' + [c1,c2,c3].join(',')+")"
                bdColor.push(color)
            })

            //chargement des couleurs et des bordures
            chartData.datasets[0].backgroundColor = bgColor;
            chartData.datasets[0].borderColor= bdColor;

            })
        .catch(error => console.log ('erreur Ajax donner non afficher '))

        })

       

);
</script>

<template>
  <div>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetidkey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<style scoped></style>
