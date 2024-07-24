const { db } = require('../config/db.js')

const _createUser = async (userInfo) => {
    const {email, firstname, lastname,} = userInfo
    const trx = await db.transaction()
    try {
        const [newUser] = await db('users')
        .insert([
            {email, firstname, lastname}
        ], ['userid', 'email']
        );
        // await trx.commit()
        return newUser

    } catch (error) {
        // await trx.rollback()
        throw error
    }
}

const _getAllUsers = async () =>{
    console.log("get all users");
    try {
        const users = await db('users')
        return users
    } catch (error) {
        console.log(error);
        throw error
    }
}

const _getUserById = async (id) =>{
    try {
        const user = await db('users')
        .select("email","firstname", "lastname")
        .where("userid", id)
        .first()
        return user
    } catch (error) {
        console.log(error);
        throw error
    }
}

const _getUserByEmail = async (email) =>{
    try {
        console.log(email);
        const user = await db('users')
        .select("userid","firstname", "lastname", "email")
        .where("email", email)
        //.select("email","firstname", "lastname")
        //.first()
        console.log(user);
        return user
    } catch (error) {
        console.log(error);
        throw error
    }
}


module.exports = {
    _createUser,
    _getAllUsers,
    _getUserById,
    _getUserByEmail
}