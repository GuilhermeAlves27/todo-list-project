// Selecionando elementos da DOM
const tasksContainer = document.querySelector('.tasksContainer');
const ul = tasksContainer.querySelector('.ul')
const button = tasksContainer.querySelector('.button')
const input = tasksContainer.querySelector('input');


//Eventos
input.addEventListener('keyup', handleKeyUp); // Erro resolvido no html onkeyup="handleKeyUp(event)"
button.addEventListener('click', adicionarTarefas);
document.addEventListener('DOMContentLoaded', carregarTarefasSalvas()) // Carrega as tarefas quando a página for carregada

function handleKeyUp(event) {
    if (event.key === 'Enter') {
        adicionarTarefas();
    }
}

function atualizarContador() {
  const counter = tasksContainer.querySelector('.counter');
  const maxLength = input.maxLength; // Obtendo o valor máximo de caracteres
  const currentLength = input.value.length; // Contando o número de caracteres digitados
  const remainingChars = maxLength - currentLength; // Calculando os caracteres restantes

  // Atualizando o texto do contador
  counter.innerText = `${remainingChars} caracteres restantes`;

    // Se o número de caracteres restantes for 0 ou menor, alteramos a cor do contador para vermelho
    if (remainingChars <= 0) {
      counter.style.color = 'red';
      // Desabilitar o campo de entrada se o limite for atingido
      
    } else {
      counter.style.color = 'gray';
      // Habilitar o campo de entrada se o número de caracteres for menor que o limite
      input.disabled = false;
    }

}

function adicionarTarefas() {
    const tarefaTexto = input.value.trim() // input.value = pega o valor atual do input, trim() remove espaços em branco no inicio ou no final da string

    if(tarefaTexto === '') {
        alert("Digite uma tarefa válida!")
        return;
    }

    const li = criarElementoTarefa(tarefaTexto);
    ul.appendChild(li);
    salvarTarefas()

    input.value = '';
    input.focus();
    input.disabled = false;
}

function criarElementoTarefa(tarefaTexto) {
    const li = document.createElement('li');
    li.innerText = tarefaTexto;

    //Criar botão de remoção
    const btnRemover = document.createElement('button');
    btnRemover.innerText = "❌";
    btnRemover.classList.add('btn-remover');

    // Criando checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', () =>{
        li.classList.toggle('completed')
    })

    btnRemover.addEventListener('click', () => {
        removerTarefa(tarefaTexto, li)
    })

    li.appendChild(btnRemover);
    li.appendChild(checkbox)
    return li;
}

function removerTarefa(texto, li) {
    li.remove();
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Remover a tarefa exta do array
    tarefas = tarefas.filter(tarefa => tarefa !== texto)

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll('ul li').forEach(li => {
        tarefas.push(li.firstChild.textContent.trim()) // Pega só o texto da tarefa
    })
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

//Carregar tarefas corretamente
function carregarTarefasSalvas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // Evita erro caso o localStorage esteja vazio
    tarefas.forEach(tarefaTexto => {
        const li = criarElementoTarefa(tarefaTexto);
        ul.appendChild(li);
    })
}

// ANIMÇÃO
particlesJS('particles-js', {
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
        value_area: 1800
      }
    },
    shape: {
      type: "circle"
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out"
    },
    color: {
      value: "#ffffff"
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  }
});