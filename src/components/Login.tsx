import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const { login, register } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (isRegister) {
      const success = register(username, password);
      if (!success) {
        setError('Ce nom d\'utilisateur existe déjà');
      }
    } else {
      const success = login(username, password);
      if (!success) {
        setError('Identifiants incorrects');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Marvel Heroes Manager</h1>
        <h2>{isRegister ? 'Inscription' : 'Connexion'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="btn-primary">
            {isRegister ? 'S\'inscrire' : 'Se connecter'}
          </button>
        </form>
        
        <p className="toggle-mode">
          {isRegister ? 'Déjà un compte ? ' : 'Pas encore de compte ? '}
          <button
            type="button"
            className="link-button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </p>
      </div>
    </div>
  );
};

