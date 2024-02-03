import React from 'react';
import App from './App';
import { calculateAge } from './App.js';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';


describe ('Vérification age', () => {
  it ('retourne le bon age', () => {
      const loise = {
          birth : new Date("11/07/1991")
      }
  expect(calculateAge(loise)).toBe(32);
  })
  it('verifie age > 18', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const inputDateNaissance = screen.getByTestId('dateNaissance');
    fireEvent.change(inputDateNaissance, { target: { value: '11/07/2022' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText('Vous devez avoir plus de 18 ans !');
      expect(errorMessage).toBeInTheDocument();
    }, 50); 
    });
});


describe('Validation du code postal', () => {
  it('code postale : 1234 -invalide - erreur', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByPlaceholderText('codePostal');
    fireEvent.change(input, { target: { value: '1234' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText('Le code postal doit contenir 5 chiffres.');
      expect(errorMessage).toBeInTheDocument();
    }, 50); 
  });
});

describe('Validation des nom / prenom / ville', () => {
  it('nom : Bob - standard, pas d\'erreur', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('nom');
    fireEvent.change(input, { target: { value: 'Bob' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText('Prenom invalide.');
      expect(errorMessage).not.toBeInTheDocument();
    }, 50); 

    });
    it('nom : ïôùéèàç - accents, pas d\'erreur', async () => {
      render(<App />);
  
      // Trouvez l'input du code postal par son placeholder
      const input = screen.getByTestId('nom');
      fireEvent.change(input, { target: { value: 'ïôùéèàç' } }); // Code postal invalide
  
      // Simulez la soumission du formulaire
      const button = screen.getByRole('button', { name: /s'enregistrer/i });
      fireEvent.click(button);
      setTimeout(() => {
        // Vérifiez si un message d'erreur spécifique est affiché
        const errorMessage = screen.getByText('Prenom invalide.');
        expect(errorMessage).not.toBeInTheDocument();
      }, 50); 
  
      });
  it('prenom : 1234 - erreur affiché', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('nom');
    fireEvent.change(input, { target: { value: '1234' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText('Prenom invalide.');
      expect(errorMessage).toBeInTheDocument();
    }, 50); 
  });
  it('prenom : &# - erreur affiché', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('nom');
    fireEvent.change(input, { target: { value: '&#' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText('Prenom invalide.');
      expect(errorMessage).toBeInTheDocument();
    }, 50); 
  });
});


describe('format de l’email', () => {
  it('mail : winston.pelletier@ynov.com - valide, pas d erreur', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const inputMail = screen.getByTestId('email');
    fireEvent.change(inputMail, { target: { value: 'winston.pelletier@ynov.com' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText('L\'email n\'est pas valide.');
      expect(errorMessage).not.toBeInTheDocument();
    }, 50); 

    });
  it('mail : winston.pelletier@ynov. - invalide - erreur formulaire', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('email');
    fireEvent.change(input, { target: { value: 'winston.pelletier@ynov.' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);

    // Attendez que toast.error soit appelé
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText('L\'email n\'est pas valide.');
      expect(errorMessage).toBeInTheDocument();
    }, 50); 
  });
  it('mail : winston.pelletier@ynov.com.com - invalide - erreur formulaire', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('email');
    fireEvent.change(input, { target: { value: 'winston.pelletier@ynov.' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);

    // Attendez que toast.error soit appelé
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText('L\'email n\'est pas valide.');
      expect(errorMessage).toBeInTheDocument();
    }, 50); 
  });
  it('mail : @ynov.com - invalide - erreur formulaire', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('email');
    fireEvent.change(input, { target: { value: 'winston.pelletier@ynov.' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);

    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText('L\'email n\'est pas valide.');
      expect(errorMessage).toBeInTheDocument();
    }, 50); 
  });
});

describe('Test de désactivation du bouton de soumission', () => {
  it('devrait désactiver le bouton si les champs ne sont pas remplis', async () => {
    render(<App />);

    // Récupère le bouton de soumission
    const submitButton = screen.getByRole('button', { name: /s'enregistrer/i });

    // Vérifie que le bouton est désactivé par défaut
    expect(submitButton).toBeDisabled();

  });
  it('devrait désactiver le bouton si TOUS les champs ne sont pas remplis', async () => {
    render(<App />);

    // Récupère le bouton de soumission
    const submitButton = screen.getByRole('button', { name: /s'enregistrer/i });

    // Optionnel : simulez des entrées pour certains champs mais pas tous
    const inputNom = screen.getByTestId('nom'); 
    fireEvent.change(inputNom, { target: { value: 'nom' } });
    const inputPrenom = screen.getByTestId('prenom'); 
    fireEvent.change(inputPrenom, { target: { value: 'prenom' } });
    const inputEmail = screen.getByTestId('email');
    fireEvent.change(inputEmail, { target: { value: 'utilisateur@example.com' } });
    
    // Vérifie que le bouton reste désactivé si tous les champs requis ne sont pas remplis
    expect(submitButton).toBeDisabled();
  });
  it('devrait activer le bouton si les champs sont remplis', async () => {
    render(<App />);

    // Récupère le bouton de soumission
    const submitButton = screen.getByRole('button', { name: /s'enregistrer/i });

    // Optionnel : simulez des entrées pour certains champs mais pas tous
    const inputNom = screen.getByTestId('nom'); 
    fireEvent.change(inputNom, { target: { value: 'nom' } });
    const inputPrenom = screen.getByTestId('prenom'); 
    fireEvent.change(inputPrenom, { target: { value: 'prenom' } });
    const inputEmail = screen.getByTestId('email');
    fireEvent.change(inputEmail, { target: { value: 'utilisateur@example.com' } });
    const inputDateNaissance = screen.getByTestId('dateNaissance');
    fireEvent.change(inputDateNaissance, { target: { value: '11/07/1991' } });
    const inputVille = screen.getByTestId('ville');
    fireEvent.change(inputVille, { target: { value: 'ville' } });
    const inputCodePostal = screen.getByTestId('codePostal');
    fireEvent.change(inputCodePostal, { target: { value: '33000' } });
    
    
    setTimeout(() => {
      // Vérifie que le bouton reste désactivé si tous les champs requis ne sont pas remplis
      expect(submitButton).toBeEnabled();
    }, 50); 
  });
});

describe('sauvegarde dans le localStorage, affiche un toast de succès, et vide les champs', () => {
  it('sauvegarde dans le localStorage', async () => {
    render(<App />);

    // Remplir les champs du formulaire
    const inputNom = screen.getByTestId('nom'); 
    fireEvent.change(inputNom, { target: { value: 'nom' } });
    const inputPrenom = screen.getByTestId('prenom'); 
    fireEvent.change(inputPrenom, { target: { value: 'prenom' } });
    const inputEmail = screen.getByTestId('email');
    fireEvent.change(inputEmail, { target: { value: 'utilisateur@example.com' } });
    const inputDateNaissance = screen.getByTestId('dateNaissance');
    fireEvent.change(inputDateNaissance, { target: { value: '11/07/1991' } });
    const inputVille = screen.getByTestId('ville');
    fireEvent.change(inputVille, { target: { value: 'ville' } });
    const inputCodePostal = screen.getByTestId('codePostal');
    fireEvent.change(inputCodePostal, { target: { value: '33000' } });  

    // Soumettez le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'enregistrer/i }));

    setTimeout(() => {
        // Vérifiez que les données sont sauvegardées dans le localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    expect(userData).toBeDefined();
    expect(userData.nom).toBe('nom'); // Assurez-vous que cela correspond à ce que vous avez mis dans le formulaire
    }, 50); 
  });
  it('Toast de réussite', async () => {
    render(<App />);

    // Remplir les champs du formulaire
    const inputNom = screen.getByTestId('nom'); 
    fireEvent.change(inputNom, { target: { value: 'nom' } });
    const inputPrenom = screen.getByTestId('prenom'); 
    fireEvent.change(inputPrenom, { target: { value: 'prenom' } });
    const inputEmail = screen.getByTestId('email');
    fireEvent.change(inputEmail, { target: { value: 'utilisateur@example.com' } });
    const inputDateNaissance = screen.getByTestId('dateNaissance');
    fireEvent.change(inputDateNaissance, { target: { value: '11/07/1991' } });
    const inputVille = screen.getByTestId('ville');
    fireEvent.change(inputVille, { target: { value: 'ville' } });
    const inputCodePostal = screen.getByTestId('codePostal');
    fireEvent.change(inputCodePostal, { target: { value: '33000' } });  

    // Soumettez le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'enregistrer/i }));

    setTimeout(() => {
      // Vérifiez que le toast de succès est affiché
      expect(toast.success).toHaveBeenCalledWith('Inscription réussie !');    
    }, 50); 
  });
  it('champs vides', async () => {
    render(<App />);
    // Remplir les champs du formulaire
    const inputNom = screen.getByTestId('nom'); 
    fireEvent.change(inputNom, { target: { value: 'nom' } });
    const inputPrenom = screen.getByTestId('prenom'); 
    fireEvent.change(inputPrenom, { target: { value: 'prenom' } });
    const inputEmail = screen.getByTestId('email');
    fireEvent.change(inputEmail, { target: { value: 'utilisateur@example.com' } });
    const inputDateNaissance = screen.getByTestId('dateNaissance');
    fireEvent.change(inputDateNaissance, { target: { value: '11/07/1991' } });
    const inputVille = screen.getByTestId('ville');
    fireEvent.change(inputVille, { target: { value: 'ville' } });
    const inputCodePostal = screen.getByTestId('codePostal');
    fireEvent.change(inputCodePostal, { target: { value: '33000' } });  

    // Soumettez le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'enregistrer/i }));
    setTimeout(() => {
      expect(screen.getByTestId('Nom').value).toBe('');
    }, 50); 
  });
});


describe('Erreur et toaster correspondant', () => {
  // Nom
  it('Nom - erreur formulaire', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('nom');
    fireEvent.change(input, { target: { value: '_^~' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText("Nom n'est pas valide.");
      expect(errorMessage).toBeInTheDocument();
    }, 50); 

    });
  it('Nom - erreur toast', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('nom');
    fireEvent.change(input, { target: { value: '_^~' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);

    // Attendez que toast.error soit appelé
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      expect(toast.error).toHaveBeenCalledWith("Nom n'est pas valide.", expect.anything());
    }, 50); 
  });
  // Prenom
  it('Prenom - erreur formulaire', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('prenom');
    fireEvent.change(input, { target: { value: '_^~' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText("Prenom n'est pas valide.");
      expect(errorMessage).toBeInTheDocument();
    }, 50); 

    });
  it('Prenom - erreur toast', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('prenom');
    fireEvent.change(input, { target: { value: '_^~' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);

    // Attendez que toast.error soit appelé
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      expect(toast.error).toHaveBeenCalledWith("Prenom n'est pas valide.", expect.anything());
    }, 50); 
  });
  // Ville
  it('Ville - erreur formulaire', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('ville');
    fireEvent.change(input, { target: { value: '_^~' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText("Ville n'est pas valide.");
      expect(errorMessage).toBeInTheDocument();
    }, 50); 

    });
  it('Ville - erreur toast', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('ville');
    fireEvent.change(input, { target: { value: '_^~' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);

    // Attendez que toast.error soit appelé
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      expect(toast.error).toHaveBeenCalledWith("Ville n'est pas valide.", expect.anything());
    }, 50); 
  });
  // Email
  it('Email - erreur formulaire', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('email');
    fireEvent.change(input, { target: { value: 'blb@blbl' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText("L'email n'est pas valide.");
      expect(errorMessage).toBeInTheDocument();
    }, 50); 

    });
  it('Email - erreur toast', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('email');
    fireEvent.change(input, { target: { value: 'blb@blbl' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);

    // Attendez que toast.error soit appelé
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      expect(toast.error).toHaveBeenCalledWith("L'email n'est pas valide.", expect.anything());
    }, 50); 
  });
  // Date de naissance
  it('Date de naissance - erreur formulaire', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('dateNaissance');
    fireEvent.change(input, { target: { value: '11/07/2022' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText('Vous devez avoir plus de 18 ans !');
      expect(errorMessage).toBeInTheDocument();
    }, 50); 

    });
  it('Date de naissance - erreur toast', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('dateNaissance');
    fireEvent.change(input, { target: { value: '11/07/2022' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);

    // Attendez que toast.error soit appelé
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      expect(toast.error).toHaveBeenCalledWith('Vous devez avoir plus de 18 ans !', expect.anything());
    }, 50); 
  });
  // CODE POSTAL
  it('Code postal - erreur formulaire', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('codePostal');
    fireEvent.change(input, { target: { value: '1234' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      const errorMessage = screen.getByText('Le code postal doit contenir 5 chiffres.');
      expect(errorMessage).toBeInTheDocument();
    }, 50); 

    });
  it('Code postal - erreur toast', async () => {
    render(<App />);

    // Trouvez l'input du code postal par son placeholder
    const input = screen.getByTestId('codePostal');
    fireEvent.change(input, { target: { value: '1234' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button', { name: /s'enregistrer/i });
    fireEvent.click(button);

    // Attendez que toast.error soit appelé
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      expect(toast.error).toHaveBeenCalledWith('Le code postal doit contenir 5 chiffres.', expect.anything());
    }, 50); 
  });
});