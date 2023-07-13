import LoginForm from 'src/components/pages/Login/LoginForm';
import RegisterForm from 'src/components/pages/Login/RegisterForm';

const LoginData = () => {
    return (
        <div className='login-register-area section-padding-1 pt-100 pb-100'>
            <div className='container'>
                <div className='row'>
                    <LoginForm />
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default LoginData;
