const cl = console.log;

const stdForm = document.getElementById("stdForm")
const stdTable = document.getElementById("stdTable")
const fnameControl = document.getElementById("fname")
const ageControl = document.getElementById('age')
const AddressControl = document.getElementById("Address")
const emailControl = document.getElementById("email")
const contactControl = document.getElementById("contact")
const submitBtn = document.getElementById("submitBtn")
const updateBtn = document.getElementById("updateBtn")
const stdinfo = document.getElementById("stdinfo")
const stdpara = document.getElementById("stdpara")



function uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

let stdArray = [];

const templating = (arr) => {
    let result = "";
    arr.forEach((ele, i) => {
        result += `<tr id="${ele.stdId}">
                      <td>${i + 1}</td>
                      <td>${ele.fname}</td>
                      <td>${ele.Address}</td>
                      <td>${ele.age}</td>
                      <td>${ele.email}</td>
                      <td>${ele.contact}</td>
                     

                     

                      <td class="text-center"><i class="fa-solid fa-pen edit text-info" onclick="onstdEdit(this)"></i></td>
                      <td class="text-center"><i class="fa-solid fa-trash delete text-danger" onclick="onstdDelete(this)"></i></td>
                  </tr> `
    });
    stdinfo.innerHTML = result
}


if (localStorage.getItem("stdArray")) {
    stdArray = JSON.parse(localStorage.getItem("stdArray"));
    templating(stdArray);
    stdpara.innerHTML = `No. of students are ${stdArray.length}`
} else {
    stdpara.innerHTML = `No Student Data Added Yet!!!`
    stdTable.classList.add("d-none")
}

const onStdAdd = (eve) => {
    eve.preventDefault();
    let stdObj = {
        fname: fnameControl.value,
        Address: AddressControl.value,
        age: ageControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId: uuid()
    }
    stdArray.push(stdObj);
    templating(stdArray)
    localStorage.setItem("stdArray", JSON.stringify(stdArray))
    eve.target.reset();
    stdpara.innerHTML = `No. of students are ${stdArray.length}`
    stdTable.classList.remove("d-none")
}

const onstdEdit = (eve) => {
    let editId = eve.closest("tr").id
    let editObj = stdArray.find((obj) => {
        return (obj.stdId === editId)
    })
    localStorage.setItem("editObj", JSON.stringify(editObj))

    fnameControl.value = editObj.fname;
    AddressControl.value = editObj.Address;
    ageControl.value = editObj.age;
    emailControl.value = editObj.email;
    contactControl.value = editObj.contact;
    submitBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
}

const onstdUpdate = (eve) => {
    let editedObj = JSON.parse(localStorage.getItem("editObj"))

    stdArray.forEach(ele => {
        if (ele.stdId === editedObj.stdId) {
            ele.fname = fnameControl.value;
            ele.Address = AddressControl.value;
            ele.age = ageControl.value;
            ele.email = emailControl.value;
            ele.contact = contactControl.value;
        }

    })
    localStorage.setItem("stdArray", JSON.stringify(stdArray))
    let tr = [...document.getElementById(editedObj.stdId).children]
    tr[1].innerHTML = fnameControl.value;
    tr[2].innerHTML = AddressControl.value;
    tr[3].innerHTML = ageControl.value;
    tr[4].innerHTML = emailControl.value;
    tr[5].innerHTML = contactControl.value;

    Swal.fire({
        icon: 'success',
        text: ` Hello ${fnameControl.value}, updated succesfully`,
        timer: 5000,
        backdrop: 'swal2-backdrop-hide',
        imageUrl: 'https://media.istockphoto.com/id/1390889734/photo/the-words-update-in-progress-are-standing-beside-the-loading-bar-upload-data-business-concept.webp?b=1&s=170667a&w=0&k=20&c=9nKa6oLHkQB7XxLtHVIAqxPX5cwgAHBaZf2Pbb9k3pE=',
        imageWidth: 300,
        imageHeight: 200,
    })
    stdForm.reset()
    submitBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    
}

const onstdDelete = (eve) => {
    let tr = eve.closest("tr")
    if (confirm("Are you sure")) {
        stdArray = stdArray.filter(obj => obj.stdId != tr.id)
        localStorage.setItem("stdArray", JSON.stringify(stdArray))

        Swal.fire({
            icon: 'success',
            text: `Hello ${tr.children[1].innerText} deleted successfully `,
            timer: 5000,
            backdrop: 'swal2-backdrop-hide',
            imageUrl: 'https://media.istockphoto.com/id/1309071618/photo/delete-shortcut-button-and-remove-or-erase-keyboard-concept-of-control-keypad-background-3d.webp?b=1&s=170667a&w=0&k=20&c=ooqDr4kGYSXEGLomHO0ME9q8nitTRC4s_dt11Kc14j0=',
            imageWidth: 200,
            imageHeight: 200,
        
        })

        tr.remove()
    } else {
        return false;
    }

    if (stdArray.length) {
        stdpara.innerHTML = `No. of students are ${stdArray.length}`
    } else {
        localStorage.removeItem("stdArray")
        stdpara.innerHTML = `No Student Data Added Yet!!!`
        stdTable.classList.add("d-none")
    }
}

updateBtn.addEventListener("click", onstdUpdate)
stdForm.addEventListener("submit", onStdAdd)