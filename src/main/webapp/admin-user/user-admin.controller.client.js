jQuery(function () {

let createuser = $("#createuser"); // put $ remember jquery object
let deleteuser = $(".wbdv-remove");
let edituser = $(".wbdv-edit");
let updateuser = $(".wbdv-update");
let users = [];

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
	//console.log(userId)
	userService.deleteUser(userId)
            .then(response => {

                findAllUsers()
            })

            
}
let currentUserId = -1
function editUser (event){


	currenttarget=$(event.currentTarget)
	td = currenttarget.parent().parent().parent().parent()
	userId=td.find('.wbdv-id').html()
	
	console.log(userId)
	userService.findUserById(userId)
        .then(user => {

            users=[]
            users.push(user)
            renderUsers()
            currentUserId=userId

        })

            
}
const updateUser = () => {
	const username = usernamefld.val()
    usernamefld.val("")
    const firstname = firstnamefld.val()
    firstnamefld.val("")
    const lastname = lastnamefld.val()
    lastnamefld.val("")
    const role = rolefld.val()
    const password = passwordfld.val()
    passwordfld.val("")
    var user = {
            username:username,
            password:password,
            firstname:firstname,
            lastname:lastname,
            password:password,
            role:role
        }
	console.log(user)
	console.log(currentUserId)
        userService.updateUser(currentUserId, user)
            .then(newUser => {
                findAllUsers()
            })

    }
updateuser = $(".wbdv-update");
updateuser.click(updateUser)
const renderUsers = () =>{
	tbody.empty()

	for(var u in users){
		const user = users[u]
		console.log(user)
		const rowClone =rowTemplate.clone()
		//console.log(rowClone)
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
	edituser = $(".wbdv-edit");
	edituser.click(editUser)
	
	}
renderUsers()

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
            password:password,
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

