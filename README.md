# Front-end
## Contexte
Pour valider ma formation de concepteur développeur d'applications, j'ai réalisé une application avec Spring Boot pour le back-end, MySQL pour la base de données et Nuxt, un framework basé sur Vue.js, pour le front-end. Le projet comprenait également la conception des diagrammes UML, des modèles MCD/MLD et des maquettes.

Une fois le back-end terminé (se trouvant dans le répertoire back-end-file-rouge), j'ai défini l'arborescence du front-end, réalisé le wireframe, puis conçu la maquette afin de donner une identité visuelle au site. J'ai ensuite configuré Nuxt et Docker, intégré Nuxt UI pour les composants et Valibot pour la validation des formulaires. Enfin, j'ai développé les pages et les composants nécessaires, puis connecté l'interface à l'API pour consulter, ajouter, modifier et supprimer les données.
## Développement
### Configuration
Après avoir finalisé le développement de la partie back-end, j’ai commencé la mise en place de la partie front-end du site web. Pour cela, j’ai ouvert l’invite de commandes et exécuté la commande ```npm create nuxt@latest```, qui permet de créer un nouveau projet Nuxt.

L’assistant d’installation propose plusieurs options : une configuration préconfigurée avec des modules, une configuration basée sur les fonctionnalités de la future version 5 de Nuxt (encore en cours de développement), ou une installation minimale sans module ni configuration supplémentaire. J’ai choisi cette dernière option afin de disposer d’une base de travail légère et de sélectionner moi-même les modules nécessaires au projet.

J’ai ensuite installé plusieurs modules officiels Nuxt afin de faciliter et d’accélérer le développement :
- **Nuxt Image** : module permettant la gestion et l’optimisation des images. Il adapte automatiquement les formats et les tailles d’images afin d’améliorer les performances du site, notamment grâce à l’utilisation de formats modernes tels que WebP et AVIF.
- **Nuxt Fonts** : module permettant d’intégrer et d’optimiser les polices d’écriture utilisées dans le projet.
- **Nuxt UI** : bibliothèque de composants d’interface utilisateur basée sur Tailwind CSS, permettant de créer rapidement une interface moderne et cohérente.
- **Nuxt Auth Utils** : module dédié à la gestion de l’authentification des utilisateurs, incluant la gestion sécurisée des cookies et des sessions.
- **Nuxt Security** : module permettant d’appliquer les bonnes pratiques de sécurité recommandées par l’OWASP grâce à la configuration des en-têtes HTTP et de différents mécanismes de protection.
- **Nuxt Charts** : module fournissant des composants permettant d’afficher des graphiques et des tableaux de statistiques.

J’ai également ajouté plusieurs dépendances au projet via le fichier package.json :

- **jwt-decode** : bibliothèque permettant de décoder le contenu (payload) des jetons JWT afin de récupérer certaines informations sur l’utilisateur authentifié, notamment son adresse électronique.
- **Valibot** : bibliothèque de validation permettant de contrôler et de sécuriser les données saisies dans les formulaires.

Une fois les dépendances installées, j’ai créé un fichier CSS principal afin d’importer les styles de Tailwind CSS ainsi que ceux de Nuxt UI. Ce fichier a ensuite été déclaré dans le fichier de configuration ```nuxt.config.ts```.

J’ai également configuré plusieurs paramètres essentiels du projet :

- Activation du mode **SSR (Server-Side Rendering)** afin d’améliorer les performances, le référencement naturel (SEO) et l’expérience utilisateur.
- Création d’une variable d’environnement nommée ```urlBackend```, utilisée pour stocker l’adresse du serveur back-end et faciliter la gestion des environnements de développement et de production.
- Configuration des polices d’écriture afin d’importer les jeux de caractères **latin** et **latin-ext**.
- Mise en place des informations de l’en-tête du site (titre, métadonnées et paramètres associés).
- Configuration de la durée de validité des sessions utilisées pour stocker les jetons JWT.
- Déclaration et configuration des différents modules utilisés par l’application.

Cette phase de configuration a permis de mettre en place une base front-end moderne, performante et sécurisée, prête à accueillir les différentes fonctionnalités du projet. Pour tester et lancer Nuxt, j’exécute la commande ```npm run dev```.
```bash
export default defineNuxtConfig({
  compatibilityDate:'2025-07-15',
  ssr:true,
  devtools:{ enabled:true },
  css:["~/assets/css/main.css"],           
  modules:[ '@nuxt/image', '@nuxt/fonts', '@nuxt/ui', '@vueuse/nuxt', 'nuxt-auth-utils', 'nuxt-security', 'nuxt-charts'],
  runtimeConfig:{
    public:{urlBackend:""},
    session:{
      password:"",
      name:"front-end-fil-rouge-session",
      cookie:{
        maxAge:60 * 60 * 24 * 7,// 1 week
      }
    }
  },
  fonts:{
    defaults:{
      weights:[500, 700, 900],
      styles:['normal'],
      subsets:[
        'latin',
        'latin-ext'
      ]
    }
  },
  ui:{colorMode:false},
  app:{
    head:{
      charset:'utf-8',
      viewport:'width=device-width,initial-scale=1',
      title:'Fil Rouge - E-commerce',
      meta:[
        {name:'description',content:'Projet de fin d\'études - E-commerce'}
      ],
      htmlAttrs:{
        lang:'fr'
      },
      link:[
        { rel:'icon', type:'image/x-icon', href:'/fav.ico' }
      ]
    }
  }
}) 
```

À la manière du projet Back-end, je termine la configuration en mettant en place l’arborescence du projet Nuxt.

### Page et composant
Je poursuis ensuite le développement en créant les différentes pages du site. Pour cela, je crée un dossier **pages** à l'intérieur du répertoire **app**, puis j'y ajoute les fichiers Vue correspondants. Nuxt gère automatiquement le routage grâce à son intégration avec Vue Router qui se base au système de routage basé sur les fichiers.

Chaque fichier placé dans le dossier **pages** génère automatiquement une route accessible depuis l'URL du site. Par exemple, le fichier **about.vue** sera accessible à l'adresse https://localhost:3000/about. Pour définir la page affichée par défaut à la racine du site, il est nécessaire de créer un fichier nommé **index.vue**.

Le système de routage fonctionne également avec des sous-dossiers. Ainsi, un fichier Vue placé dans un dossier du répertoire **pages** sera accessible en ajoutant le nom du dossier dans l'URL. Cette organisation permet de structurer efficacement les différentes sections du site.

Nuxt offre également la possibilité de créer des routes dynamiques. Pour cela, il suffit de nommer un fichier avec une syntaxe entre crochets, par exemple **[id].vue**. L'URL pourra alors recevoir une valeur dynamique à la place de cet identifiant, comme https://localhost:3000/1. Je mets en place l'arborescence du site en m'appuyant sur la structure définie lors de la phase de conception.

Chaque page contient une balise **template**, qui accueille la structure HTML, ainsi qu'une balise **script setup**, permettant d'utiliser JavaScript et les fonctionnalités offertes par Vue.js et Nuxt. J'utilise également la fonction **useSeoMeta** afin de renseigner les métadonnées de chaque page et d'améliorer son référencement.

Je crée ensuite un dossier **components**, destiné à regrouper l'ensemble des composants réutilisables de l'application. Afin de faciliter leur organisation, je les répartis dans plusieurs sous-dossiers selon leur fonction, par exemple form pour les composants liés aux formulaires ou **elements** pour les composants récurrents utilisés à différents endroits du site.

Une fois les composants développés, je les importe dans les pages concernées puis les intègre dans la balise **template** à l'aide de leur nom de composant. Cette approche favorise la réutilisation du code et améliore la maintenabilité du projet.
```bash
<template>
    <h2>Page de test</h2>
    <Test/>
</template>
<script setup>
import Test from '~/components/dashboard/Test.vue';
    useSeoMeta({
        title:"Page de démonstration",
        ogTitle:"Page de démonstration",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        ogDescription:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        ogImage:"/img/seo/logo-seo.webp",
        twitterCard:"summary_large_image"
    })
</script>
```
La page d’exemple

<template>
    <section>
        <h3>Composant de test</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nostrum voluptatem officiis accusamus reiciendis odit iure, reprehenderit officia sunt nisi ipsa pariatur eum. Odio repudiandae nesciunt repellendus aliquam molestiae. Vitae.</p>
    </section>
</template>
<script setup></script>
```

Le composant d’exemple

Je développe les différents composants en m'appuyant sur la maquette graphique validée au préalable. À ce stade du projet, aucune communication avec le serveur n'est encore mise en place : l'ensemble des données affiché sur les pages est donc statique.

### Authentification
Je commence par mettre en place le système d’authentification des utilisateurs. Pour cela, je crée un dossier ```server```, puis un sous-dossier ```api``` destiné à contenir les différents endpoints de l’application. À l’intérieur de celui-ci, je crée un dossier auth qui regroupe tous les endpoints liés à l’authentification.

Dans Nuxt, les fichiers d’API sont nommés selon une convention spécifique : le nom du fichier est suivi de la méthode HTTP associée (```GET```, ```POST```, ```PUT```, ```PATCH``` ou ```DELETE```). Cette convention permet au framework de générer automatiquement les routes correspondantes. Par exemple, le fichier ```test.delete.ts```, placé dans le répertoire ```server/api/auth```, sera accessible via l’URL ```/api/auth/test``` en utilisant la méthode HTTP ```DELETE```.

L’utilisation d’endpoints côté serveur présente plusieurs avantages, notamment la possibilité de gérer de manière sécurisée les cookies et les sessions utilisateur. Dans ce contexte, je crée le fichier login.post.ts, dont le rôle est de traiter la connexion de l’utilisateur et d’enregistrer les jetons d’authentification JWT.

Lorsqu’une requête de connexion est reçue, je récupère les données présentes dans le corps de la requête. J’utilise ensuite la bibliothèque jwt-decode afin de décoder le contenu des deux jetons JWT : l’Access Token et le Refresh Token. Les informations extraites, notamment les dates d’expiration, sont stockées dans des variables.

Les deux jetons sont ensuite enregistrés dans des cookies sécurisés. La durée de validité de chaque cookie est configurée pour correspondre à la date d’expiration du jeton associé. Cette approche garantit une cohérence entre la durée de vie des cookies et celle des jetons d’authentification.

Par la suite, j’utilise la fonction setUserSession fourni par le module Nuxt Auth Utils afin de créer la session utilisateur. J’y enregistre plusieurs informations utiles, telles que l’adresse e-mail de l’utilisateur, la date d’expiration de l’Access Token ainsi que son rôle au sein de l’application.

Enfin, l’endpoint retourne la date d’expiration du Refresh Token au client. En cas d’erreur lors de l’une des étapes du processus, l’exécution est interrompue et l’erreur est automatiquement prise en charge par le mécanisme de gestion des exceptions.

```bash
import {jwtDecode} from "jwt-decode"
interface jwtDecodeInterface {
    iss:string,
    sub:string,
    role:string,
    exp:number,
    iat:number
}
export default defineEventHandler(async(event)=>{
    try{
        const jwt = await readBody(event),
            AccessTokenDecode:jwtDecodeInterface = jwtDecode(jwt.accessToken),
            refreshTokenDecode:jwtDecodeInterface = jwtDecode(jwt.refreshToken);
        setCookie(event,'auth:access',jwt.accessToken,{
            sameSite:'strict',
            expires:new Date(AccessTokenDecode.exp * 1000),
            secure:true
        });
        setCookie(event, 'auth:refresh',jwt.refreshToken,{
            expires:new Date(refreshTokenDecode.exp * 1000),
            sameSite:'strict',
            secure:true
        });
        await setUserSession(event,{
            user:{
                email:AccessTokenDecode.sub,
                exp:AccessTokenDecode.exp,
                role:AccessTokenDecode.role
            }
        })
        return new Date(refreshTokenDecode.exp);
    } catch(e){
        return;
    }
})
```
Je me dirige ensuite vers le composant contenant le formulaire de connexion.

Je commence par créer la variable credentials, qui utilise la fonction ref() de Vue.js. Cette fonction reçoit en paramètre un objet contenant les propriétés email, password et grantType. L'utilisation de ref() permet de rendre ces données réactives : toute modification effectuée dans l'interface est automatiquement répercutée dans la variable, et inversement. Cette liaison est utilisée pour associer les champs du formulaire aux données saisies par l'utilisateur.

J'ajoute ensuite des règles de validation à l'aide de la bibliothèque Valibot. Celles-ci permettent de vérifier :

- que le champ email est renseigné ;
- que sa valeur est au format texte ;
- qu'elle respecte la syntaxe d'une adresse e-mail valide ;
- que le champ mot de passe est renseigné ;
- que sa valeur est également au format texte.

Si l'une de ces validations échoue, un message d'erreur est affiché sous le champ concerné et l'exécution de l'action associée au bouton « Se connecter » est bloquée.

Je termine par l'implémentation de la fonction login, qui est déclenchée lors du clic sur le bouton « Se connecter ». Par mesure de sécurité, cette fonction effectue à nouveau une vérification des validations afin d'éviter tout contournement des contrôles réalisés côté interface.

Une fois les données validées, la fonction envoie une requête au serveur Spring en appelant la méthode authenticate, développée dans la partie Backend dédiée à la sécurité. La réponse du serveur contient les jetons JWT nécessaires à l'authentification. Ces derniers sont ensuite transmis au serveur Nuxt afin d'être enregistrés dans des cookies sécurisés.

Après l'enregistrement des jetons, l'application demande à Nuxt de récupérer les informations de l'utilisateur désormais authentifié et de mettre à jour la session en conséquence. Enfin, l'utilisateur est redirigé vers la page d'accueil de l'application.

```bash 
<script setup>
import * as v from 'valibot';
import IconsArrowRight from '~/svg/IconsArrowRight.vue'
const errorMessage = ref(),
    config = useRuntimeConfig().public.urlBackend,
    backendUrl = config == "" ? "http://localhost:8080/m2l" :config,
    {fetch:refreshSession} = useUserSession(),
    schema = v.object({
        email:v.pipe(
            v.string("L'email doit être en format textuel"),
            v.email("L'email doit être dans le format :***@***.***"),
            v.nonEmpty("Ce champ est obligatoire")
        ),
        password:v.pipe(
            v.string("Le mot de passe doit être en format textuel"),
            v.nonEmpty("Ce champ est obligatoire")
        )
    }),
    credentials = ref({
        email:"",
        password:"",
        grantType:"PASSWORD"
    }),
    Login=async(e)=>{
        e.preventDefault();
        try{
            v.parse(schema, credentials.value);
            const data = await $fetch(`${backendUrl}/authenticate`,{
                method:'POST',
                body:credentials.value,
                credentials:'include'
            });
            await $fetch('/api/auth/login',{
                method:'POST',
                body:data
            })
            await refreshSession();
            navigateTo('/');
        }catch(e){errorMessage.value = "Une erreur a été rencontré,veuillez réessayer plus tard."}
    }
</script>
```
Le script du composant

```
<template>
  <p v-if="errorMessage">{{errorMessage}}</p>
  <UForm @submit.prevent="Login" :schema="schema" :state="credentials">
    <UFormField label="Adresse mail" name="email" required>
      <UInput name="emailInput" id="emailInput" v-model="credentials.email" type="email" placeholder="exemple@email.com" size="lg" />
    </UFormField>
    <UFormField label="Le mot de passe" name="password" required>
      <UInput name="passwordInput" id="passwordInput" v-model="credentials.password" type="password" placeholder="********" size="lg" />
    </UFormField>
    <UButton type="submit" color="primary" variant="solid">Se connecter
      <IconsArrowRight />
    </UButton>
  </UForm>
</template>
```
Le template du composant

Je poursuis ensuite le développement de la fonctionnalité d’inscription des utilisateurs. Comme pour le composant précédent, je commence par créer une variable ```credentials``` regroupant l’ensemble des informations nécessaires à la création d’un compte : nom, prénom, adresse e-mail, numéro de téléphone, adresse de livraison, adresse de facturation, ainsi que deux champs dédiés au mot de passe afin de vérifier leur correspondance.

Je mets ensuite en place les différents validateurs permettant de contrôler les données saisies. Ceux-ci vérifient notamment que les champs obligatoires ne sont pas vides, que les données respectent le type attendu et qu’elles respectent les contraintes de longueur minimale et maximale définies. Des règles de validation supplémentaires sont appliquées au mot de passe afin de renforcer la sécurité du compte : il doit comporter au minimum huit caractères, contenir au moins un chiffre ainsi qu’une lettre majuscule et une lettre minuscule.

Je développe ensuite la fonction ```register```, chargée de vérifier l’ensemble des validations avant d’envoyer les données au serveur. Si l’inscription est réalisée avec succès, l’utilisateur est automatiquement redirigé vers la page de connexion. Dans le cas contraire, un message d’erreur approprié est affiché.

Afin de compléter la gestion des utilisateurs, j’ajoute également une fonctionnalité de déconnexion. Pour cela, je crée un fichier ```logout.ts``` dans le dossier serveur. Ce point d’entrée est chargé de supprimer les deux cookies contenant respectivement l’Access Token et le Refresh Token, mettant ainsi fin à la session de l’utilisateur.

```bash
export default defineEventHandler(async(event)=>{
    deleteCookie(event,'auth:refresh');
    deleteCookie(event,'auth:access');
})
```
J’intègre ensuite cette fonctionnalité dans le composant de navigation. J’ajoute une section qui n’est affichée que lorsque l’utilisateur est authentifié. Celle-ci contient notamment l’accès au panier ainsi qu’un menu déroulant réalisé à l’aide d’un composant Nuxt UI. Dans la partie script, je crée une variable userMenu regroupant les différentes actions disponibles, dont l’option « Se déconnecter ».

Une fonction spécifique est associée à cette action. Lorsqu’elle est exécutée, elle appelle l’endpoint de déconnexion, réinitialise les données utilisateur précédemment récupérées par Nuxt, puis redirige l’utilisateur vers la page de connexion.

```bash
{loggedIn} = useUserSession(),
    {clear} = useUserSession(),
    userMenu = [
        [
            {
                label:"Modifier les données personnelles",
                icon:"i-lucide-square-pen",
                to:"/account/edit"
            }
        ],[
            {
                label:"Consulter les commandes",
                icon:"i-lucide-archive",
                to:"/shopping"
            }
        ],[
            {
                label:"Se déconnecter",
                icon:"i-lucide-log-out",
                onSelect:async(e)=>{
                    await $fetch("/api/auth/logout");
                    clear();
                    navigateTo("/login");
                }
            }
        ]
    ];

```
Le script pour le menu
```bash
<div class="flex items-center gap-4" v-if="loggedIn">
  <NuxtLink to="/shopping">Gestion de panier</NuxtLink>
  <UDropdownMenu class="cursor-pointer" :items="userMenu" :popper="{placement:'bottom-end'}">
    <UButton color="gray" variant="ghost" icon="i-heroicons-user-circle" title="Voir le compte utilisateur"/>
  </UDropdownMenu>
</div>
```
Le template qui affiche le menu

Enfin, afin de sécuriser l’accès à certaines pages de l’application, je mets en place des middlewares d’authentification. Je crée un dossier ```middleware``` contenant un premier fichier ```authenticate.ts```, chargé de récupérer la session utilisateur et de vérifier son état de connexion. Un second middleware est ensuite développé afin de contrôler également la présence du rôle « Administrateur ».

Pour les pages nécessitant une authentification, j’utilise la fonction ```definePageMeta``` afin d’associer le middleware ```authenticated```. Ainsi, les utilisateurs non connectés sont automatiquement redirigés et ne peuvent pas accéder aux ressources protégées de l’application.

```bash
export default defineNuxtRouteMiddleware(() => {
    const {loggedIn} = useUserSession();
    if (!loggedIn.value) return navigateTo('/login');
})
```
Le middleware authenticated.ts

```bash 
definePageMeta({
    middleware:['authenticated']
})
```
La page qui met en place le middleware

### Interaction avec le serveur

Je commence par créer un fichier TypeScript dans le dossier composables. Ce fichier centralise plusieurs fonctions utilitaires destinées à simplifier les appels à l’API et à éviter la duplication de code dans l’application.

La première fonction mise en place permet d’effectuer des requêtes HTTP GET ne nécessitant pas de jeton d’authentification JWT. Chaque fonction reçoit en paramètre l’URL de la requête et utilise la méthode ```$fetch``` fournie par Nuxt pour communiquer avec l’API.

Cette fonction récupère la réponse de la requête dans une variable puis retourne un objet contenant deux propriétés : ```data```, qui stocke les données retournées par l’API, et ```error```, qui indique si une erreur est survenue. En cas de succès, la propriété ```error``` est définie à ```false```. En cas d’échec, la fonction retourne un tableau vide dans data et positionne ```error``` à ```true```. Cette approche permet d’uniformiser la gestion des réponses et des erreurs dans l’ensemble de l’application.

```bash
export async function accessDataNoJwt(url:string,obj:Object){
    try{
        const data = await $fetch(url,{
            method:'GET',
            credentials:'include'
        })
        return{data:data,error:false}
    }catch (e){
        return{data:[],error:true}
    }
}
```
Je passe ensuite au composant chargé d’afficher la liste des articles. Dans ce composant, je crée deux variables réactives : la première est un booléen permettant de suivre l’état de chargement des données, tandis que la seconde stocke le résultat retourné par la fonction ```AccessDataNoJwt()```.

Je développe ensuite une fonction responsable de la récupération des articles. Celle-ci reçoit en paramètres le numéro de page ainsi que les différents filtres appliqués par l’utilisateur. Lors de son exécution, elle construit la requête en intégrant les filtres renseignés afin de récupérer la liste des articles correspondants ainsi que les informations de pagination. Une fois les données chargées, la variable indiquant l’état de chargement est mise à jour.

Cette fonction est appelée à plusieurs moments du cycle de vie du composant : lors du chargement initial de la page, lorsqu’un utilisateur modifie un filtre ou lorsqu’il change de page dans la pagination.

Enfin, dans le template, un affichage conditionnel est mis en place. Tant que les données sont en cours de chargement, un écran de chargement est affiché. Si une erreur survient lors de la récupération des données, un message d’erreur est présenté à l’utilisateur. Dans le cas contraire, les articles sont affichés à l’aide du composant ```ElementListBook```, auquel les données récupérées sont transmises via les propriétés du composant.

```bash
<script setup>
import FitlerBook from '../form/FitlerBook.vue';
import ElementListBook from './ElementListBook.vue';
const config = useRuntimeConfig().public.urlBackend,
    backendUrl = config == "" ? "http://localhost:8080/m2l" :config,
    filters = ref({format:null,editor:null, genres:null, search:""}),
    loading = ref(true),
    data = ref(),
    callData = async (offset,page)=>{
        filters.value = page;
        if(page.search != ''){
            data.value = await accessDataNoJwt(`${backendUrl}/articles/${offset}/9/${encodeURI(page.search.replaceAll('/', '-'))}`);
        }
        else{
            data.value = await accessDataNoJwt(`${backendUrl}/articles/${offset}/9`);
        }
        loading.value = false;
    }
let offsetPage = ref(1);
callData(offsetPage.value - 1,filters.value);
watch(filters.value,(newFilters)=>{
    callData(offsetPage.value - 1,newFilters)
})
watch(offsetPage,(newOffset)=>{callData(newOffset - 1,filters.value)})
</script>
```
Le script de la liste de livre
```bash
<template>
  <section>
    <div>
      <FitlerBook @filter="(filter) => callData(offsetPage - 1, filter)" />
        <div v-if="loading == true">
          <div v-for="i in 9">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div v-else-if="data.error">
          <p>Une erreur a été rencontré</p>
        </div>
        <div v-else>
          <div>
            <ElementListBook v-for="(book) in data.data.content" :book="book" :offsetPage="offsetPage" />
          </div>
          <UPagination v-model:page="offsetPage" show-edges :sibling-count="2" :total="data.data.totalPages * 10" :ui="{ item:'cursor-pointer', prev:'cursor-pointer', next:'cursor-pointer', first:'cursor-pointer', last:'cursor-pointer' }" />
        </div>
      </div>
    </section>
</template>
```

Je développe ensuite une nouvelle fonction dont le rôle est de rafraîchir l’Access Token lorsqu’il arrive à expiration. Pour cela, je crée dans le dossier serveur un fichier nommé ```refresh.post.ts```. Ce point d’entrée permet de mettre à jour le cookie contenant l’Access Token et d’actualiser la session de l’utilisateur. 

```bash
import {jwtDecode} from "jwt-decode";
interface jwtDecodeInterface {
    iss:string,
    sub:string,
    role:string,
    exp:number,
    iat:number
}
export default defineEventHandler(async(event)=>{
    const jwt = await readBody(event),
        accessTokenDecode:jwtDecodeInterface = jwtDecode(jwt.accessToken);
    setCookie(event, 'auth:access', jwt.accessToken,{
        sameSite:'strict',
        expires:new Date(accessTokenDecode.exp * 1000),
        secure:true
    });
    await setUserSession(event,{
        user:{
            email:accessTokenDecode.sub,
            exp:accessTokenDecode.exp
        }
    })
    return true;
})
```
Par la suite, je retourne dans le fichier ```authentication.ts``` afin d’implémenter la fonction ```refreshAuth```. Cette fonction commence par récupérer l’URL du serveur, puis effectue une requête HTTP de type POST. Le Refresh Token, récupéré depuis un cookie, ainsi que le type de connexion sont transmis dans le corps de la requête.

Une fois la requête traitée par ```refresh.post.ts```, la fonction demande à Nuxt de recharger les données de session de l’utilisateur afin de synchroniser les informations d’authentification. Si l’ensemble du processus se déroule correctement, la fonction retourne la valeur ```true```. En revanche, si une erreur survient à l’une des étapes, celle-ci est interceptée et le processus de rafraîchissement est considéré comme échoué.

```bash
export async function refreshAuth(){
    const config = useRuntimeConfig().public.urlBackend,
        backendUrl = config == "${BACKEND_URL}" ? "http://localhost:8080/m2l" :config;
    try{
        const{fetch:refreshSession}= useUserSession(),
            jwtData:JwtDataInterface = await $fetch(`${backendUrl}/authenticate`,{
                method:'POST',
                credentials:'include',
                body:{
                    refreshToken:useCookie("auth:refresh").value,
                    grantType:'REFRESH_TOKEN'
                }
            })
        await $fetch('/api/auth/refresh',{
            method:'POST',
            body:jwtData
        })
        await refreshSession();
        return true;
    }
    catch (e){
        return false;
    }
}
```
La fonction refreshAuth()

Je crée ensuite une troisième fonction, **accessData()**, chargée d’effectuer les requêtes **GET** nécessitant une authentification. Cette fonction envoie la requête en ajoutant la clé **Access Token** dans l’en-tête ```Authorization``` de la requête. La réponse du serveur est ensuite récupérée dans une variable puis retournée afin d’être exploitée par les différents composants de l’application. 

```bash
export async function accessData(url:string){
    try{
        const data = await $fetch(url,{
            method:'GET',
            credentials:'include',
            headers:{
                authorization:`Bearer ${useCookie('auth:access').value}`
            }
        })
        return{data:data,error:false};
    }catch (e){
        return{data:[],error:true};
    }
}
```

Je développe également trois autres fonctions dédiées aux autres types de requêtes HTTP : **putData()** pour les requêtes **PUT**, **postData()** pour les requêtes **POST** et **deleteData()** pour les requêtes **DELETE**. Leur fonctionnement est très similaire à celui de **accessData()**, avec quelques adaptations selon le type d’opération réalisée. 

Je me rends ensuite dans le composant utilisé par les pages d’administration du site. Ce composant permet de gérer les différentes ressources de l’application (livres, auteurs, éditeurs et articles) en offrant les fonctionnalités d’ajout, de modification et de suppression.

Dans ce composant, je commence par déclarer plusieurs variables réactives :

- **loading**, qui indique si les données sont en cours de chargement ;
- une variable destinée à stocker les données récupérées depuis l’API ;
- une variable permettant de récupérer l’attribut transmis au composant (```books```, ```articles```, ```authors``` ou ```editors```).

Pour cet exemple, le composant est configuré pour gérer les **articles**.

Je crée ensuite une fonction nommée **getData()**, dont le rôle est de récupérer les données depuis le serveur. Cette fonction utilise **accessData()** pour effectuer la requête. Si une erreur liée à l’authentification est détectée, elle appelle la fonction **refreshAuth()** afin de générer un nouvel **Access Token**. Une fois le nouveau jeton obtenu, la requête est relancée automatiquement. Lorsque le traitement est terminé, la variable **loading** est mise à ```false```.

Dans le template, plusieurs cas sont ensuite gérés :

- Si **loading** est à true, un écran de chargement est affiché ;
- Si une erreur survient lors de la récupération des données, le message d’erreur correspondant est présenté à l’utilisateur ;
- Si aucune erreur n’est détectée mais qu’aucun article n’est disponible, un message indique que la liste des articles est vide ;
- Enfin, si les données sont correctement récupérées, la liste des articles est affichée.

Pour faciliter la navigation dans les résultats, j’utilise un composant de pagination fourni par **Nuxt UI**. Celui-ci affiche plusieurs numéros de page permettant à l’utilisateur de consulter les différents ensembles de résultats. À chaque changement de page, le composant déclenche automatiquement l’exécution de la fonction **getData()**, qui récupère et affiche les articles correspondant à la page sélectionnée.

```bash
const route = useRoute(),
    config = useRuntimeConfig().public.urlBackend,
    backendUrl = config == "" ? "http://localhost:8080/m2l" :config,
    {user}= useUserSession(),
    props = defineProps(['data']),
    loading = ref(true),
    data = ref(),
    offsetPage = ref(1),
    getData=async(offset)=>{
        loading.value = true;
        if(user.value != null){
            data.value = await accessData(`${backendUrl}/${props.data}/all/${offset - 1}`);
            if (data.value.error){
                await refreshAuth();
                data.value = await accessData(`${backendUrl}/${props.data}/all/${offset - 1}`);
            }
        }
        loading.value = false;
    };
getData(offsetPage.value);
watch(offsetPage,(newOffset)=>getData(newOffset));
```
Le script du composant

```bash
<div v-if="loading == true">
  <div v-for="n in 3" :key="n">
    <div class="h-[15em] bg-gray-200 rounded-lg w-[10em]"></div>
    <div class="flex-1 px-2 text-center w-[15%] md:text-left">
      <div class="h-8 bg-gray-200 my-3 rounded-lg w-[75%]"></div>
      <div class="h-5 bg-gray-200 my-1 rounded-lg w-[55%]"></div>
      <div class="h-5 bg-gray-200 my-1 rounded-lg w-[45%]"></div>
    </div>
  </div>
  <p v-else-if="data.data.totalElements == 0 && !data.error">Aucun article a été créer</p>
  <p v-else-if="data.error" class="font-bold text-red mb-5">Erreur durant le chargement du panier. Veuillez réessayer plus tard.</p>
  <template v-else-if="props.data == 'articles'">
    <NuxtImg :src="backendUrl + '/files/' + item.book.image" :alt="'La couverture de ' + item.book.title + ' en ' + item.title" />
    <div class="flex-1 px-8 text-left md-text-left">
      <h3 >{{item.book.title}}</h3>
      <p>Format: {{item.title}}</p>
      <p>Auteur: <span v-for="(e,index) in item.book.authors">{{e.lastname}} {{e.firstname}} {{index + 1 != item.book.authors.length ? "," : ""}}</span></p>
      <p>Éditeur: {{item.editor.title}}</p>
      <p>Dimension: {{item.width + ' X ' + item.height + ' X ' + item.thickness}}</p>
      <p>Prix: {{item.price}} €</p>
      <p>Stock: il reste {{item.stock}} article {{item.stock > 1 ? "s" : ""}}</p>
    </div>
  </template>
  <div>
  <NuxtLink :to="`/admin/${props.data}/${item.id}`">Modifier
    <IconEdit />
  </NuxtLink>
</div>
<UPagination :ui="{item: 'cursor-pointer',prev: 'cursor-pointer',next: 'cursor-pointer',first: 'cursor-pointer',last:'cursor-pointer'}" v-model:page="offsetPage" show-edges :sibling-count="2" :total="data.data.totalPages * 10" />
</div>
```
Un bout du template du composant

Je souhaite désormais ajouter une fonctionnalité permettant de supprimer un article depuis le composant. Pour cela, je crée les variables ```deleteId```, qui permet de stocker l’identifiant de l’article à supprimer ainsi que sa position dans la liste, et ```deleteMessage```, utilisée pour afficher un message de confirmation ou de résultat de la suppression.

Je développe ensuite la fonction ```deleteAdminData()```, chargée d’envoyer une requête de suppression au serveur à partir de l’identifiant de l’article sélectionné. Comme pour la fonction ```getData()```, si la requête rencontre une erreur liée à l’authentification, la fonction ```refreshAuth()``` est appelée afin de renouveler le jeton d’accès, puis la requête est relancée. Si l’erreur persiste, un message d’erreur est affiché à l’utilisateur. Dans le cas contraire, la méthode ```splice()``` est utilisée pour supprimer l’article concerné de la variable ```data```, ce qui met immédiatement à jour l’affichage de la liste.

J’ajoute ensuite un bouton de suppression pour chaque article. Lorsqu’un utilisateur clique dessus, une fenêtre modale de confirmation s’affiche afin d’éviter toute suppression accidentelle. Si l’utilisateur confirme son choix, la fonction ```deleteAdminData()``` est exécutée.
```bash
const deleteId = ref([]),
    deleteMessage = ref(false),
    deleteAdminData=async()=>{
        let delData = await deleteData(`${backendUrl}/${props.data}/${deleteId.value[0]}`);
        if(delData.error == true){
            await refreshAuth();
            delData = await deleteData(`${backendUrl}/${props.data}/${deleteId.value[0]}`);
        }
        if(delData.error == false){
            data.value.data.content.splice(deleteId.value[1],1);
            deleteMessage.value = false;
        }else data.value.error = true;
    }
    ```
Un bout du script du composant

```bash
<UModal v-model:open="deleteMessage" title="Message de suppression">
  <UButton color="red" variant="solid" @click="deleteId = [item.id,index]">Supprimer
    <IconTrash />
  </UButton>
  <template #content>
    <p class="p-[1em]">Voulez-vous vraiment supprimer ?</p>
    <div class="flex p-[1em] justify-between">
      <UButton @click="deleteAdminData(item.id,index)" >Supprimer</UButton>
      <UButton @click="deleteMessage = false">Annuler</UButton>
    </div>
  </template>
</UModal>
```
Un bout du template du composant

J’utilise ensuite la fonction native ```onMounted()``` de Vue, qui exécute son contenu lors du chargement du composant. Cette fonction permet d’effectuer les requêtes nécessaires pour récupérer les données des livres et des éditeurs, qui sont ensuite utilisées pour alimenter les listes de sélection du formulaire.

Je développe également une fonction ```submit()```, déclenchée lors de la validation du formulaire. Cette fonction commence par vérifier que l’ensemble des validations est respecté. Si le formulaire est valide, les données sont envoyées au serveur à l’aide de la fonction ```postData()```. Une fois l’opération réussie, un message de confirmation est affiché et les nouvelles données sont transmises au composant parent.

Dans le composant parent, j’utilise le composant modal fourni par Nuxt UI afin d’afficher le formulaire de création d’article. Un attribut permet de récupérer les données envoyées par le composant enfant, ce qui rend possible la fermeture automatique de la fenêtre modale ainsi que l’ajout immédiat du nouvel article dans la variable ```data```.

```bash
<UModal v-model:open="addForm" :title="props.data == 'editor' ? 'Ajouter un éditeur' :props.data == 'author' ? 'Ajouter un auteur' :props.data == 'articles' ? 'Ajouter un article' : 'Ajouter un livre'">
  <UButton>
    <UIcon name="i-lucide-plus"/>
  </UButton>
  <template #body>
    <FormCreateArticle v-if="props.data == 'articles'" :isUpdate="false" @add-article="(n)=>{
      addForm = false;
      data.data.content.push(n)
    }" />
  </template>
</UModal>
```
Le bout du template du composant parent

```bash
const submit=async()=>{
  errorMessage.value = false;
  successMessage.value = false;
  if(!props.isUpdate){
    try{
      if(!v.safeParse(schema,data.value)) errorMessage.value = "Le formulaire n'a pas bien été rempli.";
      else{
        let articleData = await postData(`${backendUrl}/articles`,data.value);
        if(articleData.error){
          await refreshAuth();
          articleData = await postData(`${backendUrl}/articles`,data.value);
        }
        if(articleData.error) errorMessage.value = "Une erreur a été rencontré. Veuillez réessayer plus tard.";
        else{
          successMessage.value = true;
            emit("addArticle",articleData.data);
          }
        }
      }catch(e){
      errorMessage.value = "Une erreur a été rencontré. Veuillez réessayer plus tard.";
    }
  }
  ```
Le  script du composant enfant

Enfin, je mets en place la fonctionnalité de modification d’un article. Pour cela, je crée une page dédiée qui utilise le même composant que celui utilisé pour la création. Afin de différencier les deux modes de fonctionnement, j’ajoute une propriété au composant enfant indiquant s’il est utilisé pour une création ou une modification.

Dans le composant enfant, cette propriété est récupérée afin d’adapter le comportement du composant. La fonction ```onMounted()``` est modifiée pour charger les données de l’article à modifier lorsque le mode édition est activé. De même, la fonction ```submit()``` est adaptée afin d’utiliser la fonction ```putData()``` à la place de ```postData()```, ce qui permet de mettre à jour les informations de l’article existant. Une fois la modification effectuée avec succès, l’utilisateur est redirigé vers la page de gestion des articles.

Pour accéder à cette fonctionnalité, j’ajoute enfin un bouton dans le composant parent permettant de rediriger l’utilisateur vers la page de modification de l’article sélectionné.
```bash
if(props.isUpdate == true){
            let getData = await accessData(`${backendUrl}/articles/admin/${id}`);
            if (getData.error){
                await refreshAuth();
                getData.value = accessData(`${backendUrl}/articles/admin/${id}`);
            }
            data.value = getData.data;
        }
        loading.value = false;
```
Bout du script dans la fonction onMounted() du composant pour modifier un article
```bash
try{
  if(!v.safeParse(schema,data.value)) errorMessage.value = "Le formulaire n'a pas bien été rempli."
  else{
    let articleData = await putData(`${backendUrl}/articles/${data.value.id}`,data.value);
    if (articleData == false){
      await refreshAuth();
      articleData = await putData(`${backendUrl}/articles/${data.value.id}`,data.value);
    }
    navigateTo('/admin/articles/all');
  }
}catch(e){
  errorMessage.value = "Une erreur a été rencontré. Veuillez réessayer plus tard.";
}
```
Bout du script de la fonction submit() du composant pour modifier un article

```bash
<template>
  <main class="px-12 relative mt-[2em] py-6">
    <NuxtLink to="/admin/books/all">
      <UIcon name="i-lucide-chevron-left" />Retourner en arrière
    </NuxtLink>
    <FormCreateArticle :isUpdate="true" />
  </main>
</template>
<script setup>
useSeoMeta({
  title:"Modifier un article",
  ogTitle:"Modifier un article",
  description:"Pouvoir modifier un article spécifiquement choisi dans la liste",
  ogDescription:"Pouvoir modifier un auteur spécifiquement choisi dans la liste",
  ogImage:"/img/seo/logo-seo.webp",
  twitterCard:"summary_large_image"
})
</script>
```
La page pour modifier un article


# Setup

Pour installer les dépendances

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Pour lancer Nuxt en local

Le serveur sera sur le port `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Construire l'application pour le mettre en production

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Lancer le projet build localement

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```
