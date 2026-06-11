import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Reconstruction de __dirname pour ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const counterPath = path.resolve(__dirname, "../fixtures/studentCounter.json");

export function generateStudentRef() {
    if (!fs.existsSync(counterPath)) {
        fs.writeFileSync(counterPath, JSON.stringify({ counter: 0 }), "utf8");
    }

    let data = JSON.parse(fs.readFileSync(counterPath, "utf8"));
    data.counter += 1;
    fs.writeFileSync(counterPath, JSON.stringify(data), "utf8");

    const padded = String(data.counter).padStart(5, "0");
    return `STD${padded}-PROJ1-G14`;
}
