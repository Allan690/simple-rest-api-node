const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'allanmogusu',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432
});

console.log(pool);
const getUsers = (request, response)=> {
    pool.query('SELECT * from users ORDER BY id ASC', (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const userById = (request, response)=> {
    const id = parseInt(request.params.id);
    pool.query('select * from users where id=$1', [id], (error, results) =>{
        if(error){
            throw error;
        }
        response.status(200).json(results.rows)
    })
};

const createUser = (request, response) => {
    const {name, email} = request.body;

    pool.query('insert into users(name, email) values ($1, $2)', [name, email], (error, results) =>{
        if(error){
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
};


const updateUser = ( request, response) => {
    const{ name, email} = request.body;
    const id = parseInt(request.params.id);

    pool.query(
        'update users set name=$1, email=$2 where id =$3', [name, email, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
};

module.exports = {
    getUsers,
    userById,
    createUser,
    updateUser,
    deleteUser
};
