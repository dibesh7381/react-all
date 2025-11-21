# Environment Variable

## How to create
- Make a file named `.env` inside project folder  
- If using Vite write like this → `VITE_APP_NAME=MyReactApp`  
- If using CRA write like this → `REACT_APP_APP_NAME=MyReactApp`

## How to use in component
- To access in Vite → `const appName = import.meta.env.VITE_APP_NAME`
- To access in CRA → `const appName = process.env.REACT_APP_APP_NAME`

---