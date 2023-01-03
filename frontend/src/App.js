import { Route, Routes } from "react-router-dom";
import * as Sentry from "@sentry/react";
import {
  AboutUs,
  BulkStep,
  BulkPreview,
  Career,
  Choice,
  ComingSoon,
  ContactUs,
  Dashboard,
  EditBulk,
  Error,
  FAQ,
  Layout,
  Pricing,
  Preview,
  Team,
  Templates,
  Terms,
  ProfilePage,
  UploadCSV,
  ChangePassword,
  ForgotPassword,
  PasswordLinkSent,
  ResetPassword,
  PasswordChangeSuccessfully,
  Home,
  Privacy,
  Checkout,
  Generate
} from "./pages";

import { IsAuthProtectedRoutes } from "./Component/ProtectedRoutes";

import "./Style/App.scss";
import { useState, lazy, Suspense } from "react";
import { Loader } from "./Component";

const Login = lazy(() => import("./Component/Signup-Login/assets/Login"));
const Signup = lazy(() => import("./Component/Signup-Login/assets/Signup"));
const ProtectedRoutes = lazy(() => import("./Component/ProtectedRoutes"));

function App() {
  const [amount, setAmount] = useState(2.99);
  const [per, setPer] = useState("month");
  const [header, setHeader] = useState("More features customised for you");
  const [type, setType] = useState("Standard");
  const [text, setText] = useState("Everything in Basic +");
  const [subText, setSubText] = useState([]);

  function amountHandler(type, price, per, header, text, subText) {
    setType(type);
    setAmount(price);
    setPer(per);
    setHeader(header);
    setText(text);
    setSubText(subText);
  }
  return (
    <>
      <div className="App">
        <Layout>
          <Routes>
            <Route
              path="/"
              index
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <IsAuthProtectedRoutes>
                  <Suspense
                    fallback={
                      <div
                        style={{
                          width: "100%",
                          height: "70vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Loader />
                      </div>
                    }
                  >
                    <Signup />
                  </Suspense>
                </IsAuthProtectedRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <IsAuthProtectedRoutes>
                  <Suspense
                    fallback={
                      <div
                        style={{
                          width: "100%",
                          height: "70vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Loader />
                      </div>
                    }
                  >
                    <Login />
                  </Suspense>
                </IsAuthProtectedRoutes>
              }
            />
            <Route
              path="/comingsoon"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <ComingSoon />
                </Suspense>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Suspense
                    fallback={
                      <div
                        style={{
                          width: "100%",
                          height: "70vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Loader />
                      </div>
                    }
                  >
                    <Dashboard />
                  </Suspense>
                </ProtectedRoutes>
              }
            />
            <Route
              path="/generate/:generateId"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <Generate />
                </Suspense>
              }
            />
            <Route
              path="/templates"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <Templates />
                </Suspense>
              }
            />
            <Route
              path="/career"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <Career />
                </Suspense>
              }
            />
            <Route
              path="choice"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <Choice />
                </Suspense>
              }
            />
            <Route
              path="/team"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <Team />
                </Suspense>
              }
            />
            <Route
              path="/terms"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <Terms />
                </Suspense>
              }
            />
            <Route
              path="/preview"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <Preview />
                </Suspense>
              }
            />
            <Route
              path="/aboutUs"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <AboutUs />
                </Suspense>
              }
            />
            <Route
              path="/FAQ"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <FAQ />
                </Suspense>
              }
            />
            <Route
              path="/bulk_step"
              element={
                <Suspense>
                  <BulkStep />
                </Suspense>
              }
            />
            <Route
              path="/edit_bulk"
              element={
                <Suspense>
                  <EditBulk />
                </Suspense>
              }
            />
            <Route
              path="/bulk_preview"
              element={
                <Suspense>
                  <BulkPreview />
                </Suspense>
              }
            />
            <Route
              path="/pricing"
              element={
                <Suspense>
                  <Pricing amountHandler={amountHandler} />
                </Suspense>
              }
            />
            <Route
              path="/contact-us"
              element={
                <Suspense>
                  <ContactUs />
                </Suspense>
              }
            />
            <Route
              path="/payment"
              element={
                <Checkout
                  type={type}
                  amount={amount}
                  per={per}
                  header={header}
                  text={text}
                  subText={subText}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Suspense
                    fallback={
                      <div
                        style={{
                          width: "100%",
                          height: "70vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Loader />
                      </div>
                    }
                  >
                    <ProfilePage />
                  </Suspense>
                </ProtectedRoutes>
              }
            />
            <Route
              path="/upload"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <UploadCSV />
                </Suspense>
              }
            />
            <Route
              path="/privacy"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <Privacy />
                </Suspense>
              }
            />
            {/* ResetPassword */}
            <Route
              path="/fff5"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <PasswordChangeSuccessfully />
                </Suspense>
              }
            />
            <Route
              path="/changepassword/:userId/:token"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <ResetPassword />
                </Suspense>
              }
            />
            <Route
              path="/fff3"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <ChangePassword />
                </Suspense>
              }
            />
            <Route
              path="/fff2"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <PasswordLinkSent />
                </Suspense>
              }
            />
            <Route
              path="/resetpassword"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <ForgotPassword />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Loader />
                    </div>
                  }
                >
                  <Error />
                </Suspense>
              }
            />
          </Routes>
        </Layout>
      </div>
    </>
  );
}

export default Sentry.withProfiler(App);
