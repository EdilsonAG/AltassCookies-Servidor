import { useState } from 'react'
import { ShoppingCart, ImageOff } from 'lucide-react'
import type { Produto } from '../types'
import { useCart } from '../context/CartContext'
import './ProdutoCard.css'

interface Props {
  produto: Produto
}

export default function ProdutoCard({ produto }: Props) {
  const { adicionarItem } = useCart()
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  //const imagem = produto.produtoImagemResponses?.[0]?.url
  const imagem = produto.url;

  async function handleAddToCart() {
    setAdding(true)
    try {
      await adicionarItem(produto.id, 1)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } finally {
      setAdding(false)
    }
  }

  return (
    <article className="produto-card">
      <div className="produto-card__img-wrap">
        {imagem ? (
          <img src={imagem} alt={produto.nome} className="produto-card__img" />
        ) : (
          <div className="produto-card__no-img">
            <ImageOff size={32} />
          </div>
        )}
        <div className="produto-card__badge">Gourmet</div>
      </div>

      <div className="produto-card__body">
        <h3 className="produto-card__nome">{produto.nome}</h3>
        <p className="produto-card__preco">
          {produto.preco != null
            ? produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : 'Sob consulta'}
        </p>
      </div>

      <button
        className={`produto-card__btn ${added ? 'added' : ''}`}
        onClick={handleAddToCart}
        disabled={adding}
      >
        <ShoppingCart size={16} />
        {added ? 'Adicionado!' : adding ? 'Adicionando...' : 'Adicionar ao carrinho'}
      </button>
    </article>
  )
}
