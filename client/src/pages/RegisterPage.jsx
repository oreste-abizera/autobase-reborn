import AuthLayout from "../layouts/AuthLayout";
import styles from "../styles/AuthLayout.module.css";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <div>
        <div
          style={{
            marginBottom: "48px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "350px", height: "48px" }}
          ></img>
        </div>
        <div className={styles.auth__card}>
          <div className={styles.auth__card__header}>
            <h3>Registration Panel</h3>
          </div>
          <div className={styles.auth__card__body}>
            <form>
              <div className={styles.auth__card__form__group}>
                <input type="text" id="names" placeholder="Full Names" />
              </div>
              <div className={styles.auth__card__form__group}>
                <input type="email" id="email" placeholder="Email" />
              </div>
              <div className={styles.auth__card__form__group}>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="new-password"
                />
              </div>
              <div className={styles.auth__card__form__group__submit}>
                <button type="submit">Register</button>
              </div>
            </form>
            <div className={styles.auth__card__forgot}>
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    color: "#B5BBC2",
                    fontWeight: 400,
                    marginRight: "10px",
                  }}
                >
                  Already have an account?
                </p>
                <Link to="/">Login here.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
