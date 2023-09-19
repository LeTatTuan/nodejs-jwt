import useService from '../service/userService';

const handleHelloWorld = (req, res) => {
    return res.render('home.ejs');
}

const handleUserPage = async (req, res) => {
    let userList = await useService.getListUser();
    console.log('check userList: ', userList);
    return res.render('user.ejs', { userList });
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    useService.createNewUser(email, password, username);
    return res.send('handleCreateNewUser');
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser
}