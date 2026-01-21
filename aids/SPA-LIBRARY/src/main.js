import { Navbar } from "./components/Navbar.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { dashboardView } from "./views/dashboard.js";
import { createBookView } from "./views/createBook.js";
import { notFoundView} from "./views/notFound.js";
import { Footer} from "./components/Footer.js";

const app = document.getElementById('app');
app.appendChild(Navbar())
//app.appendChild(registerView());
// app.appendChild(loginView());
//app.appendChild(dashboardView());
//app.appendChild(createBookView());
app.appendChild(notFoundView());
app.appendChild(Footer());