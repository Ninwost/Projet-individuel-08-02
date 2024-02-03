import './App.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function calculateAge(p){
  let dateDiff = new Date(Date.now() - p.birth.getTime());
  let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
  return age;
}

export function InscriptionForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    dateNaissance: '',
    ville: '',
    codePostal: ''
  });

  const isFormValid = () => {
    return formData.nom.trim() !== '' &&
           formData.prenom.trim() !== '' &&
           formData.email.trim() !== '' &&
           formData.dateNaissance.trim() !== '' &&
           formData.ville.trim() !== '' &&
           formData.codePostal.trim() !== '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};
    let isErrors = false;  
    //vérification de la validité du nom avec un regex
    const regexName = /^[a-zA-ZÀ-ÿ-]+(?:\s[a-zA-ZÀ-ÿ-]+)*$/;
    if (!regexName.test(formData.nom)) {
      toast.error("Nom n'est pas valide.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formErrors.nom = "Nom n'est pas valide.";
      isErrors = true;
    }
    //vérification de la validité du prenom avec un regex
    if (!regexName.test(formData.prenom)) {
      toast.error("Prenom n'est pas valide.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formErrors.prenom = "Prenom n'est pas valide.";
      isErrors = true;
    }
    //vérification de la validité du mail avec un regex
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    if (!regexEmail.test(formData.email)) {
      toast.error("L'email n'est pas valide.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formErrors.email = "L'email n'est pas valide.";
      isErrors = true;
    }
    //verification de l'age, interdit aux moins de 18 ans
    if (calculateAge({ birth: new Date(formData.dateNaissance) }) < 18) {
      toast.error('Vous devez avoir plus de 18 ans !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formErrors.dateNaissance = "Vous devez avoir plus de 18 ans !";
      isErrors = true;
    }
    //vérification de la validité du prenom avec un regex
    if (!regexName.test(formData.ville)) {
      toast.error("Ville n'est pas valide.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formErrors.ville = "Ville n'est pas valide.";
      isErrors = true;
    }
    //verification du code postal, format français / 5 chiffres
    const regexCodePostal = /^[0-9]{5}$/;
    if (!regexCodePostal.test(formData.codePostal)) {
      toast.error('Le code postal doit contenir 5 chiffres.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formErrors.codePostal = "Le code postal doit contenir 5 chiffres.";
      isErrors = true;
    }
    if (isErrors) {
      setErrors(formErrors);
      return;
    }
    console.log(formData);
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
    
  };

  return (
    <form onSubmit={handleSubmit} className="formulaire">
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
