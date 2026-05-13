//  Produto 
export interface ProdutoImagemResponse {
  id: number
  url: string
}

export interface Produto {
  id: number
  nome: string
  preco: number | null
  url: string 
  produtoImagemResponses: ProdutoImagemResponse[]
}

//  Cliente 
export interface Cliente {
  nome: string
  email: string
  senha: string
  tipoNotificacao: string
}

export interface ClienteResponse {
  nome: string
  email: string
}

//  Carrinho 
export interface ItemCarrinhoResponse {
  id: number
  produto: Produto
  quantidade: number
}

export interface CarrinhoResponse {
  id: number
  itemCarrinho: ItemCarrinhoResponse[]
}

//  Pedido 
export type StatusPedido = 'CRIADO' | 'PAGO' | 'CANCELADO' | 'ENVIADO' | 'ENTREGUE'

export interface ItemPedidoResponse {
  id: number
  nomeProduto: string
  precoUnitario: number
  quantidade: number
}

export interface PedidoResponse {
  id: number
  cliente: ClienteResponse
  total: number
  status: StatusPedido
  itens: ItemPedidoResponse[]
  clientSecret: string
}

//  Pagamento 
export interface PagamentoRequest {
  tipo: string
  pedidoId: number
}

export type StatusPagamento = 'PENDENTE' | 'APROVADO' | 'RECUSADO'

export interface PagamentoResponse {
  transactionId: string
  statusPagamento: StatusPagamento
  body: string
}
