import './App.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Calculates the age based on the given birth date.
 * @param {Object} p - The person object containing the birth date.
 * @returns {number} The calculated age.
 */
export function calculateAge(p){
  let dateDiff = new Date(Date.now() - p.birth.getTime());
  let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
  return age;
}

/**
 * Renders a form for user registration.
 *
 * @returns {JSX.Element} The registration form component.
 */
export function InscriptionForm() {
  /**
   * Represents the form data state.
   * @property {string} nom - The last name.
   * @property {string} prenom - The first name.
   * @property {string} email - The email address.
   * @property {string} dateNaissance - The date of birth.
   * @property {string} ville - The city.
   * @property {string} codePostal - The postal code.
   */
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    dateNaissance: '',
    ville: '',
    codePostal: ''
  });

  /**
   * Checks if the form data is valid.
   * @returns {boolean} True if the form data is valid, false otherwise.
   */
  const isFormValid = () => {
    return formData.nom.trim() !== '' &&
           formData.prenom.trim() !== '' &&
           formData.email.trim() !== '' &&
           formData.dateNaissance.trim() !== '' &&
           formData.ville.trim() !== '' &&
           formData.codePostal.trim() !== '';
  };

  /**
   * Handles the change event of an input element.
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [errors, setErrors] = useState({});

   /**
   * Check the validity of the form data and displays a toast message.
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};
    let isErrors = false;  
    //vérification de la validité du nom avec un regex
    const regexName = /^[a-zA-ZÀ-ÿ-]+(?:\s[a-zA-ZÀ-ÿ-]+)*$/;
    if (!regexName.test(formData.nom)) {
      toast.error("Nom n'est pas valide.", {

      });
      formErrors.nom = "Nom n'est pas valide.";
      isErrors = true;
    }
    //vérification de la validité du prenom avec un regex
    if (!regexName.test(formData.prenom)) {
      toast.error("Prenom n'est pas valide.", {

      });
      formErrors.prenom = "Prenom n'est pas valide.";
      isErrors = true;
    }
    //vérification de la validité du mail avec un regex
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    if (!regexEmail.test(formData.email)) {
      toast.error("L'email n'est pas valide.", {

      });
      formErrors.email = "L'email n'est pas valide.";
      isErrors = true;
    }
    //verification de l'age, interdit aux moins de 18 ans
    if (calculateAge({ birth: new Date(formData.dateNaissance) }) < 18) {
      toast.error('Vous devez avoir plus de 18 ans !', {

      });
      formErrors.dateNaissance = "Vous devez avoir plus de 18 ans !";
      isErrors = true;
    }
    //vérification de la validité du prenom avec un regex
    if (!regexName.test(formData.ville)) {
      toast.error("Ville n'est pas valide.", {

      });
      formErrors.ville = "Ville n'est pas valide.";
      isErrors = true;
    }
    //verification du code postal, format français / 5 chiffres
    const regexCodePostal = /^[0-9]{5}$/;
    if (!regexCodePostal.test(formData.codePostal)) {
      toast.error('Le code postal doit contenir 5 chiffres.', {

      });
      formErrors.codePostal = "Le code postal doit contenir 5 chiffres.";
      isErrors = true;
    }
    if (isErrors) {
      setErrors(formErrors);
      return;
    } else {
      localStorage.setItem('userData', JSON.stringify(formData));

      // Affichage du toast de succès
      toast.success('Inscription réussie !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Réinitialisation des champs du formulaire
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        dateNaissance: '',
        ville: '',
        codePostal: ''
      });
      errors.nom = "";
      errors.prenom = "";
      errors.email = "";
      errors.dateNaissance = "";
      errors.ville = "";
      errors.codePostal = "";
      
    }
    
    
  };

  return (
    <form data-testid="form" onSubmit={handleSubmit} className="formulaire">
      <input data-testid="nom" type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
      {errors.nom && <div style={{color: 'red'}}>{errors.nom}</div>}
      <input data-testid="prenom" type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
      {errors.prenom && <div style={{color: 'red'}}>{errors.prenom}</div>}
      <input data-testid="email" type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      {errors.email && <div style={{color: 'red'}}>{errors.email}</div>}
      <input data-testid="dateNaissance" type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} required />
      {errors.dateNaissance && <div style={{color: 'red'}}>{errors.dateNaissance}</div>}
      <input data-testid="ville" type="text" name="ville" value={formData.ville} onChange={handleChange} placeholder="Ville" required />
      {errors.ville && <div style={{color: 'red'}}>{errors.ville}</div>}
      <input data-testid="codePostal" type="text" name="codePostal" value={formData.codePostal} onChange={handleChange} placeholder="codePostal" required />
      {errors.codePostal && <div style={{color: 'red'}}>{errors.codePostal}</div>}
      <button type="submit" disabled={!isFormValid()}>S'enregistrer</button>
    </form>
  );
}


/**
 * Renders the main application component.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <div className="App">
      <h1>Inscription</h1>
      <InscriptionForm /> 
      <ToastContainer />     
    </div>
  );
}

export default App;
