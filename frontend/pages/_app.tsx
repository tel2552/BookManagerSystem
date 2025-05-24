import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '../redux/store'; // Import a Redux store ของคุณ
// import '../styles/globals.css'; // หากคุณมี global styles
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
return (
        <Provider store={store}>
            <Component {...pageProps} />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </Provider>
    );
}

// MyApp เป็น component หลักที่ Next.js ใช้ในการ render ทุกหน้า
export default MyApp;