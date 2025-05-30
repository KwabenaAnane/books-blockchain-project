import { app } from "./app.mjs";

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});