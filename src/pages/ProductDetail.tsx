import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/Product/ProductGrid';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, getProductsByCollection, loading } = useProducts();
  const product = id ? getProductById(id) : undefined;

  // Scroll to top when component mounts or product ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [id]);

  // Handle related product clicks with scroll reset
  const handleRelatedProductClick = (productId: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    navigate(`/product/${productId}`);
  };

  // Show loading skeleton while data is being fetched
  if (loading || (!product && id)) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Skeleton */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
              <span className="text-gray-400">/</span>
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
              <span className="text-gray-400">/</span>
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              <span className="text-gray-400">/</span>
              <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Product Image Skeleton */}
              <div className="space-y-4">
                <div className="w-full aspect-square bg-gray-300 rounded-lg animate-pulse"></div>
              </div>

              {/* Product Details Skeleton */}
              <div className="space-y-6">
                <div>
                  <div className="h-8 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-8 bg-gray-300 rounded w-24 animate-pulse"></div>
                    <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
                  </div>
                </div>

                <div>
                  <div className="h-6 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>

                {/* Contact Buttons Skeleton */}
                <div className="space-y-4">
                  <div className="bg-gray-100 border rounded-lg p-4">
                    <div className="h-5 bg-gray-300 rounded w-48 mb-3 animate-pulse"></div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                      <div className="flex-1 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Features Skeleton */}
                <div className="border-t pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="h-5 bg-gray-300 rounded w-24 animate-pulse"></div>
                    <div className="h-5 bg-gray-300 rounded w-28 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Skeleton */}
          <div className="mt-16">
            <div className="h-8 bg-gray-300 rounded w-48 mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="w-full aspect-square bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-3"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-300 rounded w-20"></div>
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show "Product Not Found" only if loading is complete and product doesn't exist
  if (!loading && !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getProductsByCollection(product.collection)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in ordering this product from CocoManthra:

🌴 *${product.name}*
💰 Price: ₹${product.price}
📦 Collection: ${product.collection}

📝 Description: ${product.description}

Could you please provide more details about availability, shipping, and payment options?

Thank you!`;
    
    const whatsappUrl = `https://wa.me/919248788585?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-green-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-green-600">Products</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/products?collection=${product.collection}`} className="text-gray-500 hover:text-green-600">
              {product.collection}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative bg-gray-50 rounded-lg">
                <div className="aspect-square w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-lg p-4"
                  />
                </div>
                {product.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {product.collection}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-green-600">₹{product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    
                    
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium mb-3">
                    Ready to order? Contact us directly:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:+91-9248788585"
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Phone className="h-5 w-5" />
                      <span>Call: +91-9248788585</span>
                    </a>
                    <button
                      onClick={handleWhatsApp}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>WhatsApp Us</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Fast Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Quality Assured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <button
                    onClick={() => handleRelatedProductClick(relatedProduct.id)}
                    className="w-full text-left"
                  >
                    <div className="relative overflow-hidden bg-gray-50">
                      <div className="aspect-square w-full">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2"
                        />
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                          {relatedProduct.collection}
                        </span>
                      </div>
                      {relatedProduct.featured && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {relatedProduct.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-600">
                          ₹{relatedProduct.price.toFixed(2)}
                        </span>
                        <span className="text-green-600 text-sm font-medium hover:underline">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;