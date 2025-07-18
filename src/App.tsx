import './App.css';

import { useState } from 'react';

import viteLogo from '/vite.svg';

import reactLogo from './assets/react.svg';
import styles from './index.module.scss';

function App() {
    const [ count, setCount ] = useState(0);
    console.log(2322332);
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <div className={styles.test}>111111</div>
                <div className={styles.testLog}>222222</div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
                </button>
                <p>
          Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
        Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
