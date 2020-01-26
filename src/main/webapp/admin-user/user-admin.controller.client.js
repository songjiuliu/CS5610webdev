jQuery(function () {

let createuser = $("#createuser"); // put $ remember jquery object
let deleteuser = $(".wbdv-remove");
let users = [];
let userList = $("#user-list")
var userService = new AdminUserServiceClient();
let rowTemplate = jQuery('.wbdv-template');

tbody = jQuery('tbody');

let firstnamefld = jQuery('#firstNameFld');
let lastnamefld = jQuery('#lastNameFld');
let passwordfld = jQuery('#passwordFld');
let usernamefld = jQuery('#usernameFld');
let rolefld = jQuery('#roleFld');



function deleteUser (event){

	currenttarget=$(event.currentTarget)
	td = currenttarget.parent().parent().parent().parent()
	
	userId=td.find('.wbdv-id').html()
	console.log(userId)
	userService.deleteUser(userId)
            .then(response => {

                findAllUsers()
            })

            
}
let currentUserId = -1
const editUser = index => {
    const userId = users[index]._id;
    currentUserId = userId;
    userService.findUserById(userId)
        .then(user => {
            console.log(user)
            usernameFld.val(user.username)
        })
}

const renderUsers = () =>{
	tbody.empty()

	for(var u in users){
		const user = users[u]
		console.log(user)
		const rowClone =rowTemplate.clone()
		console.log(rowClone)
		rowClone.removeClass('wbdv-hidden')
		rowClone.find('.wbdv-username').html(users[u].username)
		rowClone.find('.wbdv-first-name').html(users[u].firstname)
		rowClone.find('.wbdv-last-name').html(users[u].lastname)
		rowClone.find(".wbdv-role").html(users[u].role)
		rowClone.find(".wbdv-id").html(users[u]._id)
		console.log(rowClone)
		tbody.append(rowClone)
	}
	deleteuser = $(".wbdv-remove");
	//console.log(deleteuser)
	deleteuser.click(deleteUser)
	}
renderUsers()
const updateUser = () => {
        const username = usernameFld.val()
        usernameFld.val("")

        userService.updateUser(currentUserId, {username: username})
            .then(newUser => {

                findAllUsers()
            })

    }
deleteuser = $(".wbdv-remove");

deleteuser.click(deleteUser)
createuser = $("#createuser");

function createUser(){

	let temptbody = jQuery('tbody');
	const username = usernamefld.val()
    usernamefld.val("")
    const firstname = firstnamefld.val()
    firstnamefld.val("")
    const lastname = lastnamefld.val()
    lastnamefld.val("")
    const role = rolefld.val()
    const password = passwordfld.val()
    passwordfld.val("")

	const rowTemplate = jQuery('.wbdv-hidden')
    var user = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            passworc:password,
            role:role
        }
	userService
    .createUser(user).then(newUser => {
        findAllUsers()
    })

}
createuser.click( () => {
	createUser();
})

const findAllUsers = () =>
userService.findAllUsers()
    .then((theUsers) => {
        users = theUsers

        renderUsers()
        })

findAllUsers()

})

