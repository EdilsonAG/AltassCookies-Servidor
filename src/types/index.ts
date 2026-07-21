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

export interface ProdutoServidor {
  id: number
  nome: string
  descricao: number | null
  preco:number
  url: string 
  _url: string
  _produtoImagemResponses: ProdutoImagemResponse[]
}

export interface Produto {
  id: number
  nome: string
  descricao: string | null
  preco: number | null
  url: string 
  
}

//  Cliente 
export interface Cliente {
  nome: string
  email: string
  senha: string
  tipoNotificacao: string
}

export interface ClienteCadastro {
  name: string
  email: string
  pass: string
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

export interface CarrinhoServidor{
  id:string
  user_id: number
  itensCarrinho: []
}

export interface ItemCarrinhoResponseServidor {
  _carrinho: CarrinhoServidor
  produto: ProdutoServidor
  quantidade: number
}

export interface CarrinhoResponse {
  id: number
  itemCarrinho: ItemCarrinhoResponse[]
}

export interface CarrinhoResponseServidor {
  id: string
  _user: number
  itensCarrinho: ItemCarrinhoResponseServidor[]
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
