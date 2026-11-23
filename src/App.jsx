import { useMemo, useState } from 'react'

const products = [
  {
    id: 1,
    name: 'Cloud Knit Sweater',
    category: 'Clothing',
    price: 89,
    oldPrice: 120,
    badge: 'BESTSELLER',
    color: 'Oatmeal',
    image:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    name: 'Everyday Leather Tote',
    category: 'Accessories',
    price: 145,
    color: 'Cognac',
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    name: 'Sculpted Ceramic Vase',
    category: 'Home',
    price: 58,
    badge: 'NEW',
    color: 'Warm white',
    image:
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    name: 'Weekend Canvas Sneakers',
    category: 'Shoes',
    price: 76,
    color: 'Natural',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    name: 'Soft Ribbed Tank',
    category: 'Clothing',
    price: 38,
    color: 'Terracotta',
    image:
      'https://images.unsplash.com/photo-1564257577-6a5a9a4f6c2f?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6,
    name: 'The Sunday Throw',
    category: 'Home',
    price: 112,
    color: 'Sage stripe',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 7,
    name: 'Mini Gold Hoops',
    category: 'Accessories',
    price: 42,
    badge: 'POPULAR',
    color: '14k gold vermeil',
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 8,
    name: 'Linen Market Shirt',
    category: 'Clothing',
    price: 94,
    color: 'Sea salt',
    image:
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85',
  },
]

const categories = ['All', 'Clothing', 'Accessories', 'Home', 'Shoes']

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10S3.2 14 3.2 8.8A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8.8 2.2Z" />
    </svg>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('featured')
  const [cartCount, setCartCount] = useState(0)
  const [addedProducts, setAddedProducts] = useState([])

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory
      const matchesSearch = `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.trim().toLowerCase())
      return matchesCategory && matchesSearch
    })

    if (sortOrder === 'price-low') return [...filtered].sort((a, b) => a.price - b.price)
    if (sortOrder === 'price-high') return [...filtered].sort((a, b) => b.price - a.price)
    return filtered
  }, [activeCategory, search, sortOrder])

  function addToCart(productId) {
    setCartCount((count) => count + 1)
    setAddedProducts((current) => [...current, productId])
    window.setTimeout(() => {
      setAddedProducts((current) => current.filter((id) => id !== productId))
    }, 1400)
  }

  return (
    <div className="storefront">
      <div className="announcement">
        <span>Thoughtful things, made to last.</span>
        <a href="#shop">Enjoy free shipping on orders over $100 <span aria-hidden="true">→</span></a>
        <span className="announcement-spacer" aria-hidden="true" />
      </div>

      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Morrow home">morrow<span>.</span></a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#shop">Shop all</a>
          <a href="#shop" onClick={() => setActiveCategory('Clothing')}>Clothing</a>
          <a href="#shop" onClick={() => setActiveCategory('Home')}>Home & living</a>
          <a href="#story">Our story</a>
        </nav>
        <div className="header-actions">
          <label className="search-box">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search products"
            />
          </label>
          <button className="bag-button" type="button" aria-label={`Shopping bag, ${cartCount} items`}>
            <BagIcon />
            <span>Bag</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> A LITTLE MORE CONSIDERED</p>
            <h1>Make room<br />for <em>the good</em><br />things.</h1>
            <p className="hero-description">
              Everyday essentials with a softer footprint. Thoughtfully chosen, made for living.
            </p>
            <a className="button button-dark" href="#shop">Explore the collection <ArrowIcon /></a>
            <div className="hero-note">
              <span className="note-star">✳</span>
              <span>Good things for<br />the everyday</span>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90"
              alt="Warm, thoughtfully designed living room with natural textures"
            />
            <div className="hero-image-caption"><span>01 / 03</span> A slower kind of living</div>
            <div className="hero-sticker"><span>LESS,</span><span>BUT</span><span>BETTER</span><i>✳</i></div>
          </div>
        </section>

        <section className="value-strip" aria-label="Our values">
          <span>Made with intention</span><i>✳</i>
          <span>Better materials</span><i>✳</i>
          <span>Things to keep</span><i>✳</i>
          <span>A little less waste</span>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE GOOD STUFF</p>
              <h2>Find your <em>everyday.</em></h2>
            </div>
            <a href="#shop" className="text-link">View everything <ArrowIcon /></a>
          </div>

          <div className="shop-controls">
            <div className="category-list" aria-label="Filter by category">
              {categories.map((category) => (
                <button
                  type="button"
                  className={`category-chip${activeCategory === category ? ' active' : ''}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
            <label className="sort-control">
              <span>Sort by</span>
              <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>

          {visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                    <button className="favorite-button" type="button" aria-label={`Add ${product.name} to favorites`}>
                      <HeartIcon />
                    </button>
                    <button
                      className={`quick-add${addedProducts.includes(product.id) ? ' added' : ''}`}
                      type="button"
                      onClick={() => addToCart(product.id)}
                    >
                      {addedProducts.includes(product.id) ? 'Added to bag ✓' : 'Add to bag +'}
                    </button>
                  </div>
                  <div className="product-info">
                    <div><h3>{product.name}</h3><span>{product.color}</span></div>
                    <p className="product-price">
                      ${product.price}
                      {product.oldPrice && <del>${product.oldPrice}</del>}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No pieces found just yet.</p>
              <button type="button" onClick={() => { setSearch(''); setActiveCategory('All') }}>
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="story-banner" id="story">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
              alt="Calm home interior with tactile, natural materials"
              loading="lazy"
            />
          </div>
          <div className="story-copy">
            <p className="eyebrow">A NOTE FROM MORROW</p>
            <h2>Less noise.<br /><em>More meaning.</em></h2>
            <p>We believe the things you live with should feel good, do good, and stick around. So we look for the makers, materials, and little details that make a difference.</p>
            <a className="text-link" href="#shop">A little about us <ArrowIcon /></a>
            <span className="story-flower" aria-hidden="true">✳</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#">morrow<span>.</span></a>
        <p>Good things, for all the days in between.</p>
        <span>© 2025 Morrow Goods</span>
      </footer>
    </div>
  )
}

export default App
