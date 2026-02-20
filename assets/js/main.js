const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")

// Captura o evento de input para formatação de valor.
amount.oninput = () => {
    // Obtém o valor atual do input e remove todos os caracteres não numéricos.
    let value = amount.value.replace(/\D/g, "")

    // Transforma o valor em centavos.
    value = Number(value) / 100

    // Atualiza o valor do input com o valor formatado.
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // Formatação de valor para BRL.
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    // Retorna o valor formatado.
    return value
}

// Captura o evento de submit do formulário.   
form.onsubmit = (event) => {
    // Previne o comportamento padrão de recarregar pag.
    event.preventDefault()

    // Cria um objeto com os detalhes da nova despesa.
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    // Chama a função que irá adicionar o ítem na lista.
    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
        // Cria o elemento de li (ítem) para adicionar o ítem na lista (ul).
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o ícone da categoria.
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `assets/images/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Cria a informação da despesa.
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesa.
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa.
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona nome e categoria na div das informações da despesa.
        expenseInfo.append(expenseName, expenseCategory)

        // Adiciona as informações do item.
        expenseItem.append(expenseIcon, expenseInfo)

        // Adiciona o item na lista.
        expenseList.append(expenseItem)

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}
