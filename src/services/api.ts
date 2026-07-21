import type {
  Produto, CarrinhoResponse, PedidoResponse,
  PagamentoRequest, PagamentoResponse, Cliente, ClienteResponse,
  ClienteCadastro,
  ProdutoServidor,
  CarrinhoResponseServidor,
} from '../types'

const BASE_URL = 'https://oracle.bytefire.com.br'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  }
  )

  if (!res.ok) throw new Error(`Erro ${res.status}`)
  if (res.status === 204 ||res.headers.get('content-length') === '0') {
    return undefined as T
  } 
  return res.json()

  const text = await res.text()
  return (text ? JSON.parse(text) : undefined) as T
}

// Produtos
export const produtoService = {
  listar: () => request<ProdutoServidor[]>('/produto/all'),

  // FormData não usa Content-Type: application/json, por isso fetch separado
  criar: (formData: FormData) =>
    fetch(`${BASE_URL}/produto`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then(r => r.json()),

  atualizarImagem: (produtoId: number, formData: FormData) =>
    fetch(`${BASE_URL}/produto/${produtoId}`, {
      method: 'PATCH',
      credentials: 'include',
      body: formData,
    }).then(r => r.json()),
}

// Carrinho
export const carrinhoService = {
  // buscar: () => request<CarrinhoResponseServidor>('/carrinho',{
  //   headers: {
  //   'Accept': 'application/json;odata.metadata=none',
  // },

  // }),
  buscar: () =>
    request<{ value: CarrinhoResponseServidor[] }>('/carrinho')
      .then(res => res.value[0] ?? null),

  adicionar: (idProduto: number, quantidade: number) =>
    request<void>(`/carrinho/add`,{
      method: 'POST',
      body: JSON.stringify({ idProduto, quantidade }),
    }),

  remover: (idProduto: number) =>
    request<void>(`/carrinho/${idProduto}`, { method: 'DELETE' }),

  editarItem: (idProduto: number, quantidade: number) =>
    request<void>(`/carrinho/${idProduto}`, {
      method: 'PATCH',
      body: JSON.stringify({ itens: { quantidade } }),
    }),
}

// Pedidos
export const pedidoService = {
  listar: () => request<PedidoResponse[]>('/pedido'),

  criar: () => request<PedidoResponse>('/pedido', { method: 'POST' }),

  cancelar: (ids: number[]) =>
    request<PedidoResponse[]>(`/pedido?${ids.map(id => `idPedido=${id}`).join('&')}`, {
      method: 'DELETE',
    }),
}

// Pagamento
export const pagamentoService = {
  pagar: (body: PagamentoRequest) =>
    request<PagamentoResponse>('/pagamento', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
}

// Cliente
export const clienteService = {
  cadastrar: (body: ClienteCadastro) =>
    request<void>('/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  deletar: () => request<void>('/cliente', { method: 'DELETE' }),

  alterar: (senha: string, campos: Record<string, unknown>) =>
    request<ClienteResponse>(`/cliente/alterar/${senha}`, {
      method: 'PATCH',
      body: JSON.stringify(campos),
    }),

   login: (email: string, password: string) =>
    request<void>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () => request<void>('/logout', { method: 'POST' }),

  meusDados: () => request<ClienteResponse>('/cliente/me'),


}