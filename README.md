# Environment Variable

## How to create
- Make a file named `.env` inside project folder  
- If using Vite write like this → `VITE_APP_NAME=MyReactApp`  
- If using CRA write like this → `REACT_APP_APP_NAME=MyReactApp`

## How to use in component
- To access in Vite → `const appName = import.meta.env.VITE_APP_NAME`
- To access in CRA → `const appName = process.env.REACT_APP_APP_NAME`

---

# React Router

## Plain Router
- <Route path="/" element={<Home />} />
- <Route path="/about" element={<About />} />

## Private Router
- const PrivateRoute = ({ children }) => {
-   const isLoggedIn = localStorage.getItem("token");
-   return isLoggedIn ? children : <Navigate to="/login" />;
- };
- <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />

## Role Based Router
- import { Navigate } from "react-router-dom";
- import { jwtDecode } from "jwt-decode";
- const RoleRoute = ({ children, role }) => {
-   const token = localStorage.getItem("token");
-   const decoded = jwtDecode(token);
-   return decoded.role === role ? children : <Navigate to="/not-authorized" />;
- };
- export default RoleRoute;
- <Route path="/customer-dashboard" element={ <RoleRoute role="customer"> <CustomerDashboard /> </RoleRoute> } />

## Dynamic Router
- <Route path="/user/:id" element={<UserPage />} />
- In the component we use: const { id } = useParams();
- :id is called dynamic parameter


