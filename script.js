const textoDigitado = document.getElementById('taskInput'); // taskInput é onde eu digito
const erros = document.getElementById('ajuda_erro');
const taskCompletas = document.getElementById('total');
const error = new Audio('./songs/error.mp3');
const removeSound = new Audio('./songs/remove.mp3');
const addSound = new Audio('./songs/popup.mp3');
const rain = new Audio('./songs/rain.mp3');
const completeSound = new Audio('./songs/multipop.mp3');

rain.play();
rain.volume = 0.5;
rain.loop = true


let totalCompletas = 0; // Variável para armazenar o total de tarefas completas

function atualizaTaskCompleta(valor) {
    taskCompletas.textContent = `Tarefas completas: ${valor}`;
}

// Função para transformar texto
function trasformaTexto(texto) {
    return texto.toUpperCase();
}

// Função para lidar com eventos de click e Enter
function handleEvent(event) {
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
        let buscaTexto = textoDigitado.value;
        let textoTransformado = trasformaTexto(buscaTexto);
        const tasklist = document.getElementById('taskList');

        // Verificar se o texto contém apenas números ou está vazio
        if (!isNaN(textoTransformado) || textoTransformado.trim() === "") {
            erros.innerHTML = `Não pode conter só números ou estar vazio.`;
            textoDigitado.value = "";
            error.play()
            return;
        }

        // Verificar se já existe uma tarefa com o mesmo nome
        let existeDuplicado = false;
        tasklist.querySelectorAll('li').forEach(function(item) {
            if (item.firstChild.textContent.trim().toUpperCase() === textoTransformado) {
                existeDuplicado = true;
            }
        });

        if (existeDuplicado) {
            erros.innerHTML = `Já existe uma tarefa com esse nome.`;
            textoDigitado.value = "";
            error.play()
            return;
        }
        addSound.play();
        // Criar o novo item utilizando document.createElement e armazená-lo em uma variável
        let novoItem = document.createElement('li');
        novoItem.classList.add('task');
        let divBotoes = document.createElement('div');

        // Criar um span para o texto da tarefa
        let textoTarefa = document.createElement('span');
        textoTarefa.textContent = textoTransformado;

        // Criar um botão de remoção
        let botaoRemover = document.createElement('button');
        botaoRemover.innerHTML = '&#10006;';
        botaoRemover.addEventListener('click', function() {
            tasklist.removeChild(novoItem);
            removeSound.play();
        });

        // Criar um botão para marcar como concluída
        let botaoConcluir = document.createElement('button');
        botaoConcluir.innerHTML = '&#10004;';
        botaoConcluir.addEventListener('click', function() {
            textoTarefa.classList.toggle('completed');
            tasklist.removeChild(novoItem);
            totalCompletas++; // Incrementa o total de tarefas completas
            atualizaTaskCompleta(totalCompletas);
            completeSound.play()
             // Atualiza a exibição do total de tarefas completas
        });

        // Adicionar o texto da tarefa e os botões ao item da lista
        novoItem.appendChild(textoTarefa);
        divBotoes.appendChild(botaoConcluir);
        divBotoes.appendChild(botaoRemover);
        novoItem.appendChild(divBotoes);

        // Adicionar o novo item à lista de tarefas
        tasklist.appendChild(novoItem);

        // Estilizar os botões
        botaoConcluir.classList.add('concluir');
        botaoRemover.classList.add('remover');

        // Limpar o campo de entrada e os erros
        erros.innerHTML = "";
        textoDigitado.value = "";
        
    }
}

// Adicionar event listener para o botão de click
document.getElementById('btn-add-task').addEventListener('click', handleEvent);

// Adicionar event listener para a tecla Enter no campo de texto
textoDigitado.addEventListener('keydown', handleEvent);
