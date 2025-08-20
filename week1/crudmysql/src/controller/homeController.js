import db from '../models/user.js'; // import database
import CRUDService from '../services/CRUDService.js'; // import service

// hàm getHomePage
let getHomePage = async (req, res) => {
    return res.send('Nguyen Huu Trung');
}

// hàm getCRUD
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

// hàm findAll CRUD
let getFindAllCrud = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log(data);
    // console.log('........');
    // return res.send('FindAll crud to server');
    return res.render('users/findAllUser.ejs', {
        data: JSON.stringify(data) // trả dữ liệu data về view
    }); // gọi view và truyền dữ liệu ra view
}

// hàm post CRUD
let postCRUD = async (req, res) => { // dùng async để xử lý bất đồng bộ
    let message = await CRUDService.createNewUser(req.body); // gọi service
    console.log(req.body); // lấy thông tin body từ http request
    console.log(message);
    return res.send('Post crud to server');
}

// hàm lấy dữ liệu để edit
let getEditCRUD = async (req, res) => {
    let userId = req.query.id; // check Id
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // console.log('userData........');
        // console.log(userData);
        return res.render('users/editUser.ejs', {
            data: userData
        });
    } else {
        return res.send('khong lay duoc id');
    }
    // console.log(req.query.id);
}

// hàm putCRUD
let putCRUD = async (req, res) => {
    let data = await CRUDService.updateUser(req.body); // update rồi hiện thị lại danh sách user
    let datal = await CRUDService.getAllUser(); // lấy danh sách user
    return res.render('users/findAllUser.ejs', {
        data: datal
    });
    // return res.send('update thanh cong');
}

// hàm deleteCRUD
let deleteCRUD = async (req, res) => {
    let id = req.query.id; // lấy từ view ?id=1
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Deleted!!!!!!!!!!!!');
    } else {
        return res.send('Not find user');
    }
}

// hàm getAbout
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

export default {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getFindAllCrud: getFindAllCrud,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}