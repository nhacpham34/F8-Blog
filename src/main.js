const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const SortMiddleware = require('./app/middelwares/SortMiddleware')
const app = express();
const port = 3000;

const routes = require('./routes');
const db = require('./config/db')


// connect to  db
db.connect()
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
// file tĩnh
app.use(express.static(path.join(__dirname, 'public')));
//  HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a,b) => a + b ,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons =  {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                }

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const icon = icons[sortType];
                const type = types[sortType];

                return `
                <a href="?_sort&column=${field}&type=${type}">
                        <span class="${icon}"></span>
                </a>
                `
            }
        }
    }),
);
app.use(methodOverride('_method'))
//  custome middleware
app.use(SortMiddleware);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

routes(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
