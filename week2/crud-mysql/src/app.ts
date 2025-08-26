import express from 'express';
import userRoutes from './routes/user.routes';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', userRoutes);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});