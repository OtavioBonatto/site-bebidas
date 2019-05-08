class Carrinho {
    constructor(carrinhoAntigo) {
        this.items = carrinhoAntigo.items || {}
        this.qtdTotal = carrinhoAntigo.qtdTotal || 0 
        this.precoTotal = carrinhoAntigo.precoTotal || 0
    }

    addItem(item, id, qtd) {
        let itemGuardado = this.items[id]
        const quantia = Number(qtd)
        const valorDoItem = item.preco * qtd

        if(!itemGuardado) {
            itemGuardado = this.items[id] = {item, quantidade: quantia, preco: item.preco * quantia}
        } else {
            itemGuardado.quantidade += quantia
            itemGuardado.preco = itemGuardado.item.preco * itemGuardado.quantidade
        }

        const precoDoItem = itemGuardado.preco
        this.precoTotal += valorDoItem
        console.log(this.precoTotal)
    }

    delItem(id) {
        this.precoTotal = this.precoTotal - this.items[id].preco
        delete this.items[id]
    }

    criaArray() {
        let arr = []

        for(var id in this.items) {
            arr.push(this.items[id])
        }

        return arr
    }
}

module.exports = Carrinho