import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowUpRight, FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi'
import { AuthContext } from '../../auth'
import { apiPost } from '../../services/apiPetition'
import './Login.css'

function Login() {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [username , setUsername] = useState("");
    const [userPw , setUserPw] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [feedback, setFeedback] = useState(null)

    const handleSubmit = event => {
        event.preventDefault()

        setIsSubmitting(true)
        setFeedback(null)

        apiPost(
            { action : "login"},
            {
                action : "login",
                body: {
                    email: username,
                    password: userPw
                }
            },
            response => {
                response = JSON.parse(response)
                setIsSubmitting(false)
                if (response?.success && response.token) {
                    login(response.token)
                    setUserPw('')
                    navigate('/registro', { replace: true })
                    return
                }

                setFeedback({
                    type: 'danger',
                    message: response?.msj || 'No se pudo iniciar sesión.'
                })
            },
            error => {
                setIsSubmitting(false)
                setFeedback({
                    type: 'danger',
                    message: error instanceof Error ? error.message : 'No se pudo conectar con el servidor.'
                })
            }
        )
    }

    return (
        <main className="login-page">
            <section className="login-showcase" aria-label="F&G Finanzas y Gestión">
                <a className="login-brand" href="#/" aria-label="F&G, ir al inicio">
                    <span className="login-brand-mark">
                        <span>F</span><span className="login-brand-amp">&</span><span>G</span>
                    </span>
                    <span className="login-brand-name">CONECTIVATE</span>
                </a>

                <div className="login-showcase-copy">
                    <span className="login-eyebrow">FINANZAS & GESTIÓN</span>
                    <h1>Todo en orden.<br />Todo en un solo lugar.</h1>
                    <p>La información de tu equipo, tus cuentas y tu gestión, siempre a mano.</p>
                </div>

                <div className="login-showcase-footer">
                    <span className="login-status-dot" aria-hidden="true" />
                    <span>Tu espacio de trabajo, más simple.</span>
                </div>
                <span className="login-orbit login-orbit-one" aria-hidden="true" />
                <span className="login-orbit login-orbit-two" aria-hidden="true" />
            </section>

            <section className="login-content">
                <div className="login-form-wrap">
                    <div className="login-mobile-brand" aria-hidden="true">
                        <span>F<span>&</span>G</span>
                        <small>CONECTIVATE</small>
                    </div>

                    <div className="login-heading">
                        <span className="login-heading-icon"><FiLock aria-hidden="true" /></span>
                        <p className="login-eyebrow">BIENVENIDO DE NUEVO</p>
                        <h2>Inicia sesión</h2>
                        <p className="login-description">Ingresa tus datos para continuar a tu espacio de trabajo.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        {feedback && (
                            <div className={`alert alert-${feedback.type} py-2`} role={feedback.type === 'danger' ? 'alert' : 'status'}>
                                {feedback.message}
                            </div>
                        )}

                        <label htmlFor="login-user">Usuario</label>
                        <div className="login-input-wrap">
                            <FiMail className="login-input-icon" aria-hidden="true" />
                            <input
                                autoComplete="username"
                                id="login-user"
                                name="user"
                                placeholder="MiNombre"
                                required
                                type="text"
                                value={username}
                                onChange={ e => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="login-password-label">
                            <label htmlFor="login-password">Contraseña</label>
                        </div>
                        <div className="login-input-wrap">
                            <FiLock className="login-input-icon" aria-hidden="true" />
                            <input
                                autoComplete="current-password"
                                id="login-password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                required
                                type={passwordVisible ? 'text' : 'password'}
                                value={userPw}
                                onChange={ e => setUserPw(e.target.value)}
                            />
                            <button
                                aria-label={passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                className="login-password-toggle"
                                onClick={() => setPasswordVisible(visible => !visible)}
                                type="button"
                            >
                                {passwordVisible
                                    ? <FiEyeOff aria-hidden="true" />
                                    : <FiEye aria-hidden="true" />}
                            </button>
                        </div>

                        <div className="login-form-options">
                            <label className="login-remember">
                                <input name="remember" type="checkbox" />
                                <span>Recordarme</span>
                            </label>
                            <span className="login-help-text">¿Necesitas ayuda? Contacta a tu administrador.</span>
                        </div>

                        <button className="login-submit" disabled={isSubmitting} type="submit">
                            {isSubmitting ? 'Verificando…' : 'Iniciar sesión'}
                            {!isSubmitting && <FiArrowUpRight aria-hidden="true" />}
                        </button>
                    </form>

                    <p className="login-privacy">
                        Acceso privado para el equipo de <strong>F&G Conectivate</strong>.
                    </p>
                </div>

                <span className="login-copyright">© {new Date().getFullYear()} F&G Conectivate</span>
            </section>
        </main>
    )
}

export default Login
