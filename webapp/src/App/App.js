/* importing react components*/
import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
/* impoting Auth file for Authentication check*/
import Auth from './Auth/Auth.js';
/* importing various Components*/
import LandingPage from './Components/LandingPage/LandingPage.js';
import LoginPage from './Components/LoginPage/LoginPage.js';
import RegisterPage from './Components/RegisterPage/RegisterPage.js';
import NavBar from './Components/NavBar/NavBar.js'; 
import Footer from './Components/Footer/Footer.js'
import MovieDetail from "./Components/MovieDetail/MovieDetail.js"
import FavoritePage from "./Components/FavoritePage/FavoritePage.js"
import Subscription from './Components/Subscribe/Subscription.js';
import Subscribe from './Components/Subscribe/Subscribe.js';
import Checkout from './Components/Subscribe/Checkout.js';
/* for stripe payment gateway */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
/* for scss styling*/
import './App.scss';

/* stripe promise contains the stripe private key */
const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY); 

/**
 * App Function
 * The function loads the whole application App
 * @returns 
 */


function App() {
  return (
    <Elements stripe={stripePromise}> 
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div className="navbar-style">
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, null)} />
          <Route exact path="/subscribe" component={Auth(Subscribe, null)} />
          <Route exact path="/checkout" component={Auth(Checkout, null)} />
          <Route exact path="/subscription" component={Auth(Subscription, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
    </Elements>
  );
}
export default App;