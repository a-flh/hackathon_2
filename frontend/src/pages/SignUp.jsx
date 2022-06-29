import React, { useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/common.css";
import "../assets/Signup.css";
import { MainContext } from "../contexts/MainContext";
import logoapside from "../assets/img/logoapside.svg";
import signup from "../assets/img/signup.jpg";

function SignUp() {
  const { setIsFirstConnection } = useContext(MainContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [agency, setAgency] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 5000);
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/auth/members`, {
          firstname,
          lastname,
          email,
          phoneNumber,
          password,
          agency,
          skills,
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setIsFirstConnection(true);
            localStorage.setItem("userId", res.data.id);
            localStorage.setItem("loggedIn", true);
            navigate("/mon-compte");
          }
        })
        .catch((err) => {
          if (err) {
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 5000);
          }
        });
    }
  };

  return (
    <div className="signup-container">
      <Link to="/">
        <img src={logoapside} className="login-logo" alt="sellect-logo" />
      </Link>
      <div className="signup-form-container">
        <h2>Bienvenue dans l'équipe !</h2>
        <form className="signup-form-content" onSubmit={handleRegister}>
          <div className="signup-name-container">
            <input
              type="text"
              placeholder="Prénom"
              value={firstname}
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nom"
              value={lastname}
              required
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Numéro de téléphone"
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <select
            name="skills"
            id="skills-select"
            onChange={(e) => setSkills(e.target.value)}
          >
            <option value="" required="">
              Spécialisation
            </option>
            <option value="Cloud">Cloud</option>
            <option value="DevOps">DevOps</option>
            <option value="BackEnd">BackEnd</option>
            <option value="FrontEnd">FrontEnd</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Dev VB.Net">Dev VB.Net</option>
            <option value="Dev JAVA">Dev JAVA</option>
            <option value="Data analyst">Data analyst</option>
          </select>
          <select
            name="city"
            id="city-select"
            onChange={(e) => setAgency(e.target.value)}
          >
            <option value="" required="">
              Agence
            </option>
            <option value="Aix-en-Provence">Aix-en-Provence</option>
            <option value="Aveira">Aveiro</option>
            <option value="Bordeaux">Bordeaux</option>
            <option value="Brest">Brest</option>
            <option value="Bruxelles">Bruxelles</option>
            <option value="Canada">Canada</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Clermont-Ferrand">Clermont-Ferrand</option>
            <option value="Dijon">Dijon</option>
            <option value="Genève">Genève</option>
            <option value="Le Mans">Le Mans</option>
            <option value="Lille">Lille</option>
            <option value="Lyon">Lyon</option>
            <option value="Montpellier">Montpellier</option>
            <option value="Munich">Munich</option>
            <option value="Nantes">Nantes</option>
            <option value="Nice">Nice – Sophia Antipolis</option>
            <option value="Niort">Niort</option>
            <option value="Orléans">Orléans</option>{" "}
            <option value="Paris">Paris</option>
            <option value="Rennes">Rennes</option>{" "}
            <option value="Strasbourg">Strasbourg</option>{" "}
            <option value="268">Toulouse</option>{" "}
            <option value="272">Tours</option>{" "}
            <option value="2628">Vernon</option>
          </select>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmer mot de passe"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="error-container">
            {error && <span className="error">Une erreur est survenue</span>}
            {passwordError && (
              <span className="error">
                Les mots de passe ne correspondent pas
              </span>
            )}
          </div>
          <div className="signup-button-container">
            <button type="submit">S'INSCRIRE</button>
          </div>
        </form>
        <p>
          Déja membre ?{" "}
          <NavLink to="/connexion" className="link-other-pages">
            Connectez-vous !
          </NavLink>
        </p>
      </div>
      <div className="signup-image-container">
        <img className="signup-image" src={signup} alt="groupOfPeople" />
        <div className="signup-image-text">
          <h1>
            Rejoignez la
            <br />
            communauté
            <br />
            APSIDE
          </h1>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
