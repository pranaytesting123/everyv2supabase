import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const Collections: React.FC = () => {
  const { collections, getProductsByCollection, loading } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-300 rounded w-80 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          {/* Collections Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="aspect-video w-full bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="aspect-square bg-gray-300 rounded"></div>
                    <div className="aspect-square bg-gray-300 rounded"></div>
                    <div className="aspect-square bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Collections</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our carefully curated collections featuring the best products in each category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => {
            const collectionProducts = getProductsByCollection(collection.name);
            
            return (
              <div key={collection.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="relative overflow-hidden bg-gray-50">
                  <div className="aspect-video w-full">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white mb-1">{collection.name}</h2>
                    <p className="text-gray-200 text-sm">{collectionProducts.length} products</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{collection.description}</p>
                  
                  {/* Preview Products */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {collectionProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="aspect-square bg-gray-50 rounded">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain rounded p-1"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    to={`/collections/${encodeURIComponent(collection.name)}`}
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 group"
                  >
                    <span>View Collection</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collections;