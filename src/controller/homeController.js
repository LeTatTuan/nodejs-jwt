import useService from '../service/userService';

const handleHelloWorld = (req, res) => {
    return res.render('home.ejs');
}

const handleUserPage = async (req, res) => {
    let userList = await useService.getListUser();
    await useService.deleteUser(5);
    return res.render('user.ejs', { userList });
}

const handleCreateNewUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    await useService.createNewUser(email, password, username);
    return res.redirect('/user');
}

const handleDeleteUser = async (req, res) => {
    await useService.deleteUser(req.params.id);
    return res.redirect('/user');
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser
}