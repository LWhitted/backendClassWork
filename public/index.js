document.addEventListener('DOMContentLoaded', getAllContacts)

async function getAllContacts() {
  const response = await fetch('http://localhost:3000/address-book')
  const contacts = await response.json()
    let htmlString = '';

  for (let i=0; i< contacts.length; i++) {
    htmlString =+ `<div class= "contactCard">
        <p>${contacts[i].name}</p>
        <p>${contacts[i].email}</p>
        <button class= "remove-contact" id=${i}> Remove </button>
    </div>`
  }
document.getElementById("contacts").innerHTML = htmlString;
}

function stringifyFormData(fd) {
    const data = {
        name: fd.get('name'),
        email: fd.get('email'),
    };
    return JSON.stringify(data);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const stringified = stringifyFormData(data);
    console.log(stringified);
    const response = await fetch('http://localhost:3000/add-contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: stringified,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

const form = document.getElementById('add-contact');
form.addEventListener("submit", handleSubmit)

// Event listener for removing contact

const handleDelete = async (e) => {
    if (e.target.className.includes("remove-contact")) {
        console.log(e.target.id);
        const response = await fetch('http://localhost:3000/delete-contact', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: e.target.id }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

document.addEventListener("click", handleDelete);