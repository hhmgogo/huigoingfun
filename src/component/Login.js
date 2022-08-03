import React, { Component, Fragment } from 'react';

class Login extends Component {
    render() {
        // return <p>Login Component</p> // JSX 技術  /轉碼器 babel

        return (
            <Fragment className='login'>
             {/*這是標註*/}
                <h2>Login</h2>
                <div>
                    <label>Email</label>
                    <div>
                        <input type='text'  placeholder='Email' />
                    </div>
                </div>
                <div>
                    <button>Login</button>
                </div>
            </Fragment>
        )

    }
}

export default Login;