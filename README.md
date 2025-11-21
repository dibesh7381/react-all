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
- `<Route path="/" element={<Home />} />`
- `<Route path="/about" element={<About />} />`

## Private Router
- `const PrivateRoute = ({ children }) => {`
- `  const isLoggedIn = localStorage.getItem("token");`
- `  return isLoggedIn ? children : <Navigate to="/login" />;`
- `};`
- `<Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />`

## Role Based Router
- `import { Navigate } from "react-router-dom";`
- `import { jwtDecode } from "jwt-decode";`
- `const RoleRoute = ({ children, role }) => {`
- `  const token = localStorage.getItem("token");`
- `  const decoded = jwtDecode(token);`
- `  return decoded.role === role ? children : <Navigate to="/not-authorized" />;`
- `};`
- `<Route path="/customer-dashboard" element={ <RoleRoute role=\"customer\"> <CustomerDashboard /> </RoleRoute> } />`

## Dynamic Router
- `<Route path="/user/:id" element={<UserPage />} />`
- `const { id } = useParams();`
- `:id` is called **dynamic parameter**

## Redireact 
- We use useNavigate() hooks for navigate
- used in component `const navigate = useNavigate();`
- `const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);

      // 🔥 Redirect to Dashboard after successful login
      navigate("/dashboard");`
    }

---

# React Folder Structure

- inside `components` folder we keep our reusable components  
  like navbar, cards, footer, buttons etc

- inside `pages` folder we keep the components  
  which are visible in the webpage like home page, about page, contact page, login page, signup page

- inside `routes` folder we keep route-related files  
  like PrivateRoute, RoleRoute etc

- inside `assets` folder we keep images, icons, logos, videos etc

- inside `utils` folder we keep helper functions  
  like token helpers, formatters, validators etc

- inside `services` folder we keep API calling functions  
  like authService, userService etc

- inside `context` folder we keep global context providers  
  like AuthContext, ThemeContext etc

- inside `redux` folder we keep redux toolkit files  
  - `store.js` → main redux store  
  - inside `slices` folder we keep slice files  
      like `userSlice.js`, `cartSlice.js`, `authSlice.js`

- `App.jsx` contains all the routes of the application

- `main.jsx` injects the App component into the DOM

---


