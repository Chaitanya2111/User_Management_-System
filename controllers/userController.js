// const { validationResult } = require('express-validator')
// const bcrypt = require('bcryptjs');

// const db = require('../config/dbConnection')

// const register = (req, res) => {

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     db.query(
//         `SELECT * FROM Users WHERE LOWER(email) =LOWER (${db.escape(
//             req.body.email
//         )});`,
//         (err, result) => {
//             if (result && result.length) {
//                 return res.status(409).send({
//                     msg: 'This user is already in use !'
//                 });
//             }
//             else {
//                 bcrypt.hash(req.body.password, 10, (err, hash) => {
//                     if (err) {
//                         return res.status(400).send({
//                             msg: err
//                         });
//                     } else {
//                         db.query(
//                             `INSERT INTO Users (name,email,password) VALUES ('${req.body.name}',${db.escape(
//                                 req.body.email
//                             )}, ${db.escape(hash)});`,
//                             (err, result) => {
//                                 if (err) {
//                                     return res.status(400).send({
//                                         msg: err
//                                     });
//                                 }
//                                 return res.status(400).send({
//                                     msg: 'The user has been registered with us'
//                                 });
//                             }
//                         )
//                     }
//                 });
//             }
//         }
//     );

// }

// module.exports = {
//     register
// }







// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');

// const db = require('../config/dbConnection');

// const randomstring = require('randomstring');
// const sendMail = require('../helpers/sendMail');



// const register = (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const email = req.body.email;
//     const name = req.body.name;
//     const password = req.body.password;

//     const checkUserQuery = `SELECT * FROM Users WHERE LOWER(email) = LOWER(@email)`;

//     db.request()
//         .input('email', email)
//         .query(checkUserQuery, (err, result) => {
//             if (err) {
//                 return res.status(500).send({ msg: err.message });
//             }

//             if (result.recordset.length > 0) {
//                 return res.status(409).send({ msg: 'This user is already in use!' });
//             }

//             bcrypt.hash(password, 10, (err, hash) => {
//                 if (err) {
//                     return res.status(500).send({ msg: err.message });
//                 }

//                 const insertUserQuery = `
//                     INSERT INTO Users (name, email, password)
//                     VALUES (@name, @email, @password)
//                 `;

//                 db.request()
//                     .input('name', name)
//                     .input('email', email)
//                     .input('password', hash)
//                     .query(insertUserQuery, (err, result) => {
//                         if (err) {
//                             return res.status(500).send({ msg: err.message });
//                         }

//                         let mailSubject = "Mail Verification";
//                         const randomToken = randomstring.generate();
//                         let content = '<p> Hii   ' + name + ',\
// Please <a href = "http://localhost:8092/mail-verification?token='+ randomToken + ' "> verify <a/> your mail'
// sendMail(email,mailSubject,content);


//     db.query('UPDATE Users token=? where email =?', [randomToken,email],function(error,result,fileds){
// if(error){
//     return res.status(400).send({
//         msg:err
//     })
// }
// });



//                         return res.status(200).send({ msg: 'The user has been registered with us' });
//                     });
//             });
//         });
// }

// module.exports = {
//     register
// };







// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const db = require('../config/dbConnection');
// const randomstring = require('randomstring');
// const sendMail = require('../helpers/sendMail');

// const register = (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const email = req.body.email;
//     const name = req.body.name;
//     const password = req.body.password;

//     const checkUserQuery = `SELECT * FROM Users WHERE LOWER(email) = LOWER(@email)`;

//     db.request()
//         .input('email', email)
//         .query(checkUserQuery, (err, result) => {
//             if (err) {
//                 return res.status(500).send({ msg: err.message });
//             }

//             if (result.recordset.length > 0) {
//                 return res.status(409).send({ msg: 'This user is already in use!' });
//             }

//             bcrypt.hash(password, 10, (err, hash) => {
//                 if (err) {
//                     return res.status(500).send({ msg: err.message });
//                 }

//                 const insertUserQuery = `
//                     INSERT INTO Users (name, email, password, token)
//                     VALUES (@name, @email, @password, @token)
//                 `;

//                 const randomToken = randomstring.generate();
                
//                 db.request()
//                     .input('name', name)
//                     .input('email', email)
//                     .input('password', hash)
//                     .input('token', randomToken)
//                     .query(insertUserQuery, (err, result) => {
//                         if (err) {
//                             return res.status(500).send({ msg: err.message });
//                         }

//                         let mailSubject = "Mail Verification";
//                         let content = `<p> Hi ${name}, Please <a href="http://localhost:8092/mail-verification?token=${randomToken}">verify</a> your mail</p>`;

//                         sendMail(email, mailSubject, content);

//                         return res.status(200).send({ msg: 'The user has been registered with us' });
//                     });
//             });
//         });
// }

// module.exports = {
//     register
// };





const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../config/dbConnection');
const randomstring = require('randomstring');
const sendMail = require('../helpers/sendMail');

const register = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
const images = req.file.filename;
    const checkUserQuery = `
        SELECT * FROM Users
        WHERE LOWER(email) = LOWER(@email)
    `;

    db.request()
        .input('email', email)
        .query(checkUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }

            if (result.recordset.length > 0) {
                return res.status(409).send({ msg: 'This user is already in use!' });
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send({ msg: err.message });
                }

                const insertUserQuery = `
                    INSERT INTO Users (name, email, password,image)
                    VALUES (@name, @email, @password,@image)
                `;

                db.request()
                    .input('name', name)
                    .input('email', email)
                    .input('password', hash)
                    .input('image',images)
                    .query(insertUserQuery, (err, result) => {
                        if (err) {
                            return res.status(500).send({ msg: err.message });
                        }

                        const mailSubject = "Mail Verification";
                        const randomToken = randomstring.generate();
                        const content = `<p> Hii   ${name},\
                            Please <a href="http://localhost:8092/mail-verification?token=${randomToken}">verify<a/> your mail</p>`;
                        
                        sendMail(email, mailSubject, content);

                        const updateTokenQuery = `
                            UPDATE Users
                            SET token = @token
                            WHERE email = @email
                        `;

                        db.request()
                            .input('token', randomToken)
                            .input('email', email)
                            .query(updateTokenQuery, (err, result) => {
                                if (err) {
                                    return res.status(500).send({ msg: err.message });
                                }

                                return res.status(200).send({ msg: 'The user has been registered with us' });
                            });
                    });
            });
        });
}

module.exports = {
    register
};
