const listStudent = document.querySelector('#student-list')

function renderList(doc){
    let li = document.createElement('li')
    let codAluno = document.createElement('span')
    let nome = document.createElement('span')
    let turma = document.createElement('span')
    let cpf = document.createElement('span')
    let rg = document.createElement('span')
    let telefoneAluno = document.createElement('span')
    let telefoneResp = document.createElement('span')
    let email = document.createElement('span')
    let dataNasc = document.createElement('span')

    li.setAttribute('data-id', doc.id),
    nome.textContent = "Nome do aluno: " + doc.nome
    codAluno.textContent = "Codigo do aluno: " + doc.cod_aluno
    turma.textContent = "Turma: " + doc.turma
    cpf.textContent = "CPF: " + doc.cpf
    rg.textContent = "RG: " + doc.rg
    telefoneAluno.textContent = "Telefone do aluno: " + doc.telefone_aluno
    telefoneResp.textContent = "Telefone do responsável: " + doc.telefone_responsavel
    email.textContent = "Email: " + doc.email
    dataNasc.textContent = "Data de nascimento: " + doc.data_nascimento

    li.appendChild(nome)
    li.appendChild(codAluno)
    li.appendChild(turma)
    li.appendChild(cpf)
    li.appendChild(rg)
    li.appendChild(telefoneAluno)
    li.appendChild(telefoneResp)
    li.appendChild(email)
    li.appendChild(dataNasc)

    listStudent.appendChild(li)
}

db.collection('BD3-NoSQL-Firestore').get()
    .then((snapshot) => {
        snapshot.docs.forEach(
            doc => {
                console.log(doc.data())
                renderList(doc.data())
            }
        )
})

const form = document.querySelector('#add-student-form')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    alert("formulario funcionando")
    
    const docRef = db.collection('BD3-NoSQL-Firestore').doc()

    const dataNascValue = new Date(form.data_nasc.value);

    docRef.set({
        cod_aluno: docRef.id,
        nome: form.nome.value,
        turma: form.turma.value,
        cpf: form.cpf.value,
        rg: form.rg.value,
        telefone_aluno: form.telefone_aluno.value,
        telefone_responsavel: form.telefone_responsavel.value,
        email: form.email.value,
        data_nascimento: dataNascValue,
    }).then(() => {
        form.nome.value = ''
        form.turma.value = ''
        form.cpf.value = ''
        form.rg.value = ''
        form.telefone_aluno.value = ''
        form.telefone_responsavel.value = ''
        form.email.value = ''
        form.data_nasc.value = ''
        window.location.reload()
    })
})

const deletar = document.querySelector('#delete-student-form')

deletar.addEventListener('submit', (event) => {
    const codAluno = deletar.delete.value
    event.preventDefault()

    db.collection('BD3-NoSQL-Firestore').get()
    .then((snapshot) => {
        let alunoExiste = false
        snapshot.docs.forEach(doc => {
                if(doc.data().cod_aluno === codAluno){
                    alunoExiste = true
                    db.collection('BD3-NoSQL-Firestore').doc(doc.id).delete()
                    .then(() => {
                        alert('Aluno deletado');
                        window.location.reload()
                    })
                }
            }
        )
        if(!alunoExiste){
            alert('Aluno não encontrado')
        }
    })
})