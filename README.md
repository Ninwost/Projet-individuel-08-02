# Formulaire d'Inscription React

Ce projet React implémente un formulaire d'inscription permettant à un utilisateur de s'enregistrer avec son nom, prénom, email, date de naissance, ville, et code postal. Le formulaire inclut des validations complètes pour chaque champ, assure que l'utilisateur est âgé de 18 ans ou plus, et utilise le format français pour le code postal. Lorsque le formulaire est correctement rempli et soumis, les données sont sauvegardées dans le localStorage et un message de succès est affiché à l'utilisateur. En cas d'erreur dans les champs, un message d'erreur est affiché pour guider l'utilisateur.

## Fonctionnalités

- Validation en temps réel de tous les champs du formulaire.
- Blocage de la soumission pour les utilisateurs de moins de 18 ans.
- Validation du format de l'email et du code postal français.
- Désactivation du bouton de soumission tant que tous les champs ne sont pas validement remplis.
- Affichage de toasters de succès ou d'erreur selon le résultat de la soumission.
- Nettoyage des champs du formulaire après une soumission réussie.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

