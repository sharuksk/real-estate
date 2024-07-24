import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const queryClient=new QueryClient();
// import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    {/* <Provider store={store}> */}
    <BrowserRouter>
    <App />
<Toaster/>
    </BrowserRouter>
    {/* </Provider> */}
    </QueryClientProvider>
    
  
   
  </React.StrictMode>
);
