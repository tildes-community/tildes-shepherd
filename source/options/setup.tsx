import {render} from "preact";
import "modern-normalize/modern-normalize.css";
import "../scss/global.scss";
import {App} from "./app.js";

const preactRoot = document.createElement("div");
document.body.append(preactRoot);
render(<App />, preactRoot);
