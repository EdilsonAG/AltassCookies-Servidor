import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './Carrinho.css'
 
export default function Carrinho() {
  const { itens, totalPreco, removerItem, editarQuantidade, loading } = useCart()

  console.log(itens.map(item =>{
    item._produto.nome
  }))

  if (loading) return <div className="cart-loading">Carregando carrinho...</div>

  


  if (itens.length === 0) {
    return (
      <main className="cart-empty">
        <ShoppingBag size={64} />
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione alguns cookies deliciosos!</p>
        <Link to="/produtos" className="btn-primary">
          Ver produtos <ArrowRight size={18} />
        </Link>
      </main>
    )
  }


  return (
    <main className="page-carrinho">
      <div className="container">
        <h1 className="page-title">Meu Carrinho</h1>

        {/* <div className="cart-layout">
          <h1>
            {carrinhoResponse?.itemCarrinho.map(item => <div>
              {item.produto.nome}
            </div>)}
          </h1>
        </div> */}
        <div className="cart-layout">
          {/* Lista de itens */}
          <section className="cart-items">
            {/* 
            {carrinhoResponse?.itemCarrinho.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item__img-wrap">
                  {item.produto.nome}
                </div>
              </div>
            ))} */}
            {itens.map(item => (
              <div key={item._produto._id} className="cart-item">
                <div>
                   {/* {item._produto.url.map(imagem => (
                    <img src={imagem.url} alt="" />
                  ))} */}
                  <img src={item._produto.url} alt="" />
                </div>
                <div className="cart-item__img-wrap">
                         <img src={"https://oracle.bytefire.com.br/produto/fotos/"+item._produto._url} alt="" />
                  {

                  // item.produto.produtoImagemResponses?.[0]?.url ? (
                  //   <img src={item.produto.produtoImagemResponses[0].url} alt={item.produto.nome} />
                  // ) 
                  // <div>asdf</div>

                  item._produto.url ? (
            
                      <img src={"https://oracle.bytefire.com.br/produto/fotos/"+item._produto.url} alt="" />
                    
                  // item.produto.produtoImagemResponses.map(image =>
                  //   <img key={image.id} src={image.url} alt="" />
                      
                  // )
                ) : (
                  <div className="cart-item__no-img">🍪 </div>
                )
                  //item.produto.produtoImagemResponses ? ():()
                  
                  // item.produto.url ? (
                    
                  //   <img src={item.produto.url}/>
                    
                  // )
                  
                  // : (
                     
                  //    <div className="cart-item__no-img">🍪</div>
                   
                  // )
                  }
                </div>

                <div className="cart-item__info">
                  <h3>{item._produto.nome}</h3>
                  <p className="cart-item__preco">
                    {(item._produto._preco ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>

                {/* <div className="cart-item__qty">
                  <button
                    type="button"
                    onClick={() => editarQuantidade(item.id, item.quantidade - 1)}
                    disabled={item.quantidade <= 1}
                    aria-label="Diminuir"
                  >
                    <Minus size={14} />
                  </button>
                  <span>{item.quantidade}</span>
                  <button
                    type="button"
                    onClick={() => editarQuantidade(item.id, item.quantidade + 1)}
                    aria-label="Aumentar"
                  >
                    <Plus size={14} />
                  </button>
                </div> */}

                <p className="cart-item__subtotal">
                 
                  {((item._produto._preco ?? 0) * item._quantidade).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>

                <button
                  className="cart-item__remove"
                  onClick={() => removerItem(item._produto._id)}
                  aria-label="Remover"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </section>

          {/* Resumo */}
          <aside className="cart-summary">
            <h2>Resumo do pedido</h2>

            <div className="cart-summary__rows">
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span>{totalPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              <div className="cart-summary__row">
                <span>Frete</span>
                <span className="free">Grátis</span>
              </div>
              <div className="cart-summary__row total">
                <span>Total</span>
                <span>{totalPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary cart-summary__btn">
              Finalizar pedido <ArrowRight size={18} />
            </Link>
            <Link to="/produtos" className="btn-outline cart-summary__btn">
              Continuar comprando
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}
