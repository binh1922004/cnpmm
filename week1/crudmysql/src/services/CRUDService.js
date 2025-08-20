import bcrypt from 'bcryptjs'; // import thư viện bcryptjs
import db from '../models/index.js'; // import database

const salt = bcrypt.genSaltSync(10); // thuật toán hash password

let createNewUser = async (data) => { // hàm tạo user với tham số data
    return new Promise(async (resolve, reject) => { // dùng Promise đảm bảo xử lý bất đồng bộ
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            });
            resolve('OK create a new user successfully');
            // console.log('data from service');
            // console.log(data) // log để lưu dữ liệu
            // console.log(hashPasswordFromBcrypt);
        } catch (e) {
            reject(e);
        }
    });
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
}

// lấy findAll CRUD
let getAllUser = () => {
    return new Promise(async (resolve, reject) => { // dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
        try {
            let users = await db.User.findAll({
                raw: true, // hiện dữ liệu gốc
            });
            resolve(users); // hàm trả về kết quả
        } catch (e) {
            reject(e);
        }
    });
}


// lấy findOne CRUD
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => { // dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
        try {
            let user = await db.User.findOne({
                where: { id: userId }, // query điều kiện cho tham số
                raw: true
            });
            if (user) {
                resolve(user); // hàm trả về kết quả
            } else {
                resolve([]); // hàm trả về kết quả rỗng
            }
        } catch (e) {
            reject(e);
        }
    });
}
// hàm put CRUD
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => { // dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
        try {
            let user = await db.User.findOne({
                where: { id: data.id } // query điều kiện cho tham số
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save(); // lưu danh sách user
                // lấy danh sách user
                let allusers = await db.User.findAll();
                resolve(allusers); // hàm trả về kết quả
            } else {
                resolve(); // hàm trả về kết quả rỗng
            }
        } catch (e) {
            reject(e);
        }
    });
}
// hàm xóa user
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => { // dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất đồng bộ
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });
            if (user) {
                user.destroy(); // xóa user
                resolve(); // trả về
            }
        } catch (e) {
            reject(e);
        }
    });
}
export default { // xuất hàm ra bên ngoài
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUserById: deleteUserById
}
