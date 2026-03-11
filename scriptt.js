let tipoPulseira = ""
let preco = 0
let pedidoTotal = []

function selecionar(tipo, valor){

tipoPulseira = tipo
preco = valor

document.getElementById("telaInicial").style.display="none"
document.getElementById("editor").style.display="block"

let corSelect = document.getElementById("cor")
let perolasDiv = document.getElementById("perolasDiv")
let charmeDiv = document.getElementById("charmeDiv")
document.getElementById("perolas").disabled = false
let olhosDiv = document.getElementById("olhosDiv")

olhosDiv.style.display = "none"
perolasDiv.style.display = "none"
charmeDiv.style.display = "none"


/* RESETAR VALORES */

document.getElementById("perolas").value = 0
document.getElementById("olhos").value = 0
document.getElementById("charme").value = ""
document.getElementById("letraInput").value = ""

/* RESET CORES */

corSelect.innerHTML = `
<option value="holografico">Holográfico</option>
<option value="amarelo">Amarelo</option>
<option value="laranja">Laranja</option>
<option value="vermelho">Vermelho</option>
<option value="verde">Verde</option>
<option value="verdeagua">Verde-Água</option>
<option value="azul">Azul</option>
<option value="roxo">Roxo</option>
<option value="rosa">Rosa</option>
<option value="marrom">Marrom</option>
<option value="branco">Branco</option>
<option value="pretoBrilho">Preto (Brilhante)</option>
<option value="pretoFosco">Preto (Fosco)</option>
`

/* REGRAS */

if(tipo === "Pulseira com pérolas"){

perolasDiv.style.display = "block"

let perolaInput = document.getElementById("perolas")
perolaInput.min = 3
perolaInput.max = 6
perolaInput.value = 3

document.getElementById("infoPerolas").innerText =
"Você pode escolher entre 3 e 6 pérolas."

}

if(tipo === "Pulseira olho grego"){

perolasDiv.style.display = "block"
olhosDiv.style.display = "block"

let perolaInput = document.getElementById("perolas")
perolaInput.min = 0
perolaInput.max = 3
perolaInput.value = 0

let olhosInput = document.getElementById("olhos")
olhosInput.min = 1
olhosInput.max = 3
olhosInput.value = 1

document.getElementById("infoPerolas").innerText =
"Você pode escolher entre 0 e 3 pérolas."

document.getElementById("infoOlhos").innerText =
"Você pode escolher entre 1 e 3 olhos gregos."

corSelect.innerHTML = `
<option value="azul">Azul</option>
<option value="branco">Branco</option>
<option value="azulbranco">Azul + Branco</option>
`

}

if(tipo === "Pulseira uma pérola"){

perolasDiv.style.display = "block"

let perolaInput = document.getElementById("perolas")
perolaInput.min = 1
perolaInput.max = 1
perolaInput.value = 1
perolaInput.disabled = true

document.getElementById("infoPerolas").innerText =
"Esta pulseira possui exatamente 1 pérola."

document.getElementById("infoOlhos").innerText = ""

}

if(tipo === "Pulseira miçanga"){

charmeDiv.style.display = "block"
corSelect.style.display = "none"

}else{

corSelect.style.display = "block"

}

if(tipo === "Pulseira personalizada"){
charmeDiv.style.display = "block"
}

gerarPulseira()

}

function mudarCor(){
gerarPulseira()
}

function gerarPulseira(){

let pulseira = document.getElementById("pulseira")
pulseira.innerHTML=""

let charme = document.getElementById("charme")?.value
let corSelecionada = document.getElementById("cor")?.value
let quantidadePerolas = parseInt(document.getElementById("perolas")?.value) || 0
let quantidadeOlhos = parseInt(document.getElementById("olhos")?.value) || 0


const cores = {
rosa:"#ffa2c6",
azul:"#ace8ff",
vermelho:"#ff6363",
laranja:"#ffbb68",
amarelo:"#ffee8e",
verdeagua:"#bdfef9",
roxo:"#b363f5",
marrom:"#d69d52",
branco:"#f8f9fa",
pretoBrilho:"#1a1a1a",
pretoFosco:"#2b2b2b",
verde:"#4CAF50"
}

let cor = cores[corSelecionada] || "#ffa2c6"
let holografico = corSelecionada === "holografico"

let total = 18
let raio = 90

/* POSIÇÕES DAS PÉROLAS */

let posicoesPerolas = []

if(quantidadePerolas === 1){

posicoesPerolas.push(Math.floor(total/2))

}else{

let espacamentoPerola = quantidadePerolas > 0 ? total / quantidadePerolas : 0

for(let p=0;p<quantidadePerolas;p++){
posicoesPerolas.push(Math.round(p * espacamentoPerola))
}

}

/* MIÇANGAS */

for(let i=0;i<total;i++){

let bead = document.createElement("div")
bead.classList.add("micanga")

let ehPerola = posicoesPerolas.includes(i)

if(ehPerola){

bead.style.background = "#fff4b0"
bead.style.boxShadow = "0 0 4px rgba(0,0,0,0.2)"

}else if(corSelecionada === "azulbranco"){

bead.style.background = i % 2 === 0 ? "#ace8ff" : "#ffffff"

}else if(holografico){

bead.style.background = "linear-gradient(45deg,#ff9cfb,#9ce7ff,#fff59c,#c7ff9c)"
bead.style.boxShadow = "0 0 6px rgba(255,255,255,0.8)"

}else{

bead.style.background = cor

}

let angulo = (i / total) * (Math.PI * 2)

let x = Math.cos(angulo) * raio
let y = Math.sin(angulo) * raio

bead.style.position = "absolute"
bead.style.left = (150 + x) + "px"
bead.style.top = (150 + y) + "px"

pulseira.appendChild(bead)

}

/* OLHOS GREGOS */

if(tipoPulseira === "Pulseira olho grego"){

let espacamentoOlho = quantidadeOlhos > 0 ? total / quantidadeOlhos : 0

for(let o=0;o<quantidadeOlhos;o++){

let posicao = Math.round(o * espacamentoOlho)

while(
posicoesPerolas.includes(posicao) ||
posicoesPerolas.includes(posicao-1) ||
posicoesPerolas.includes(posicao+1)
){
posicao++
if(posicao >= total) posicao = 0
}

let angulo = (posicao / total) * (Math.PI * 2)

let x = Math.cos(angulo) * raio
let y = Math.sin(angulo) * raio

let olho = document.createElement("div")
olho.classList.add("charme")
olho.innerHTML = "🧿"

olho.style.position="absolute"
olho.style.left=(150+x+11)+"px"
olho.style.top=(150+y+6)+"px"
olho.style.transform="translate(-50%,-50%)"

pulseira.appendChild(olho)

}

}

/* CHARME CENTRAL */

if(charme){

let c = document.createElement("div")
c.classList.add("charme")

if(charme==="coracao") c.innerHTML="❤️"
if(charme==="estrela") c.innerHTML="⭐"
if(charme==="cruz") c.innerHTML="✝️"
if(charme==="caveira") c.innerHTML="💀"
if(charme==="urso") c.innerHTML="🧸"
if(charme==="hello") c.innerHTML="🎀"

if(charme==="letras"){
let letra = document.getElementById("letraInput")?.value || "A"
c.innerHTML = letra.toUpperCase()
}

pulseira.appendChild(c)

}

}

/* ADICIONAR AO PEDIDO */

function finalizar(){

let quantidade = document.getElementById("quantidade").value
let nome = document.getElementById("nome").value.trim()

if(nome === ""){
alert("Por favor, digite seu nome.")
return
}

let cor = document.getElementById("cor")?.value
let perolas = document.getElementById("perolas")?.value
let charme = document.getElementById("charme")?.value
let letra = document.getElementById("letraInput")?.value || ""
let contato = document.getElementById("contato").value.trim()

if(contato === ""){
alert("Por favor, deixe um WhatsApp ou Instagram para contato.")
return
}

let pagamento = document.getElementById("pagamento").value

if(pagamento === ""){
alert("Selecione a forma de pagamento.")
return
}

let item = {
tipo: tipoPulseira,
preco: preco,
quantidade: quantidade,
cor: cor,
perolas: perolas,
charme: charme,
letra: letra,
nome: nome,
contato: contato,
pagamento: pagamento
}

pedidoTotal.push(item)

mostrarResumo()





}

/* RESUMO DO PEDIDO */

function mostrarResumo(){

let texto=""
let total=0

pedidoTotal.forEach((p,i)=>{

let subtotal=p.preco*p.quantidade
total+=subtotal

texto+=
"<b>Pulseira "+(i+1)+"</b><br>"+
"Tipo: "+p.tipo+"<br>"+
"Nome: "+p.nome+"<br>"+
"Contato: "+p.contato+"<br>"+
"Cor: "+(p.cor || "-")+"<br>"+
"Pérolas: "+(p.perolas || 0)+"<br>"+
"Charme: "+(p.charme || "-")+"<br>"+
"Letra: "+(p.letra || "-")+"<br>"+
"Quantidade: "+p.quantidade+"<br>"+
"Subtotal: R$"+subtotal+"<br><br>"+
"Pagamento: "+p.pagamento+"<br>"


})

texto+="<b>TOTAL: R$"+total+"</b>"

document.getElementById("textoResumo").innerHTML=texto

document.getElementById("caixaResumo").style.display="flex"

}

function confirmarCompra(){

let p = pedidoTotal[pedidoTotal.length-1]

let params = {

nome: p.nome,
contato: p.contato,
tipo: p.tipo,
cor: p.cor,
perolas: p.perolas,
charme: p.charme,
letra: p.letra,
quantidade: p.quantidade,
pagamento: p.pagamento,
total: p.preco * p.quantidade

}

emailjs.send("service_bsdklmi","template_1ylren2",params)

.then(function(){

alert("Pedido enviado com sucesso! 💌")

})

.catch(function(error){

alert("Erro ao enviar pedido")

})

}

function escolherOutra(){

document.getElementById("caixaResumo").style.display="none"

document.getElementById("editor").style.display="none"
document.getElementById("telaInicial").style.display="block"

}

/* MOSTRAR CAMPO DE LETRA */

document.getElementById("charme")?.addEventListener("change", function(){

let letraDiv = document.getElementById("letraDiv")

if(this.value === "letras"){
letraDiv.style.display = "block"
}else{
letraDiv.style.display = "none"
}

gerarPulseira()

})
function voltar(){

document.getElementById("editor").style.display="none"
document.getElementById("telaInicial").style.display="block"

}

function validarQuantidade(){

let q = document.getElementById("quantidade")

if(q.value < 1){
q.value = 1
}

}
