import React from 'react';

const Login = (props) => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    emailError,
    passwordError,
    handleSignup,
    hasaccount,
    setHasaccount,
  } = props;

  return (
    <section className='login'>
      <div className='loginContainer'>
        <label>Email</label>
        <input
          type='text'
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className='errorMsg'>{emailError}</p>
        <label>Password</label>
        <input
          type='password'
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='errorMsg'>{passwordError}</p>
        <div className='btnContainer'>
          {hasaccount ? (
            <>
              <button onClick={handleLogin}>Sign in</button>
              <p>
                Don't have an account ?{' '}
                <span onClick={() => setHasaccount(!hasaccount)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignup}>Sign up</button>
              <p>
                Already have an account?
                <span onClick={() => setHasaccount(!hasaccount)}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
