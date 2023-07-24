import React, { useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Preloader from './Components/Preloader';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import PageNotFound from './Components/PageNotFound';
import { doc, getDoc } from 'firebase/firestore';
import BlogPost from './Components/Blog/BlogPost';
import SavedBlogs from './Components/Blog/SavedBlogs';
import RefundPolicy from './Components/RefundPolicy';
import Terms from './Components/Terms';

const PrivacyPolicy = lazy(() => import('./Components/PrivacyPolicy'));
const MainPage = lazy(() => import('./Components/Main/MainPage'));
const NavbarCustom = lazy(() => import('./Components/Navbar'));
const Blog = lazy(() => import('./Components/Blog/Blog'));
// const Products = lazy(() => import('./Components/Product/Products'));
// const Shop = lazy(() => import('./Components/Shop/Shop'));
const Admin = lazy(() => import('./Components/Admin/BlogAdmin'));

console.log('Welcome to Ouranos Robotics Pvt. Ltd.');

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault()
  //   }
  //   document.addEventListener("contextmenu", handleContextMenu)
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu)
  //   }
  // }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
        getDoc(doc(db, 'admin', '_Users'))
        .then((snap) => {
          if (snap.data().blog.includes(auth.currentUser.email)) setIsAdmin(true);
        })
        .catch((err)=>console.log(err));
      } else {
        setUserLoggedIn(false);
        setIsAdmin(false);
      }
    })
  }, [])
  return (
    <>
      <Router>
        <NavbarCustom {...{ userLoggedIn, isAdmin, setIsAdmin }} />
        <Suspense fallback={<Preloader h={'0px'} />}>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/saved-blogs' element={<SavedBlogs />} />
            <Route path='/blog/:id' element={<BlogPost />} />
            {/* <Route path='product' element={<Products />} />
            <Route path='shop' element={<Shop />} /> */}
            {
              isAdmin &&
              <Route path='/admin-blog' element={<Admin />} />
            }
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/refund-policy' element={<RefundPolicy />} />
            <Route path='/terms-and-conditions' element={<Terms />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  );
}

export default App;
