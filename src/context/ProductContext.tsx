import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Collection, HeroProduct, SiteSettings } from '../types';
import { supabase, setupBuildTriggers } from '../lib/supabase';

interface ProductContextType {
  products: Product[];
  collections: Collection[];
  siteSettings: SiteSettings;
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCollection: (collection: Omit<Collection, 'id' | 'createdAt'>) => Promise<void>;
  updateCollection: (id: string, collection: Partial<Collection>) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
  updateHeroProduct: (heroProduct: HeroProduct) => Promise<void>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getCollectionById: (id: string) => Collection | undefined;
  getProductsByCollection: (collection: string) => Product[];
  getFeaturedProducts: () => Product[];
  searchProducts: (query: string) => Product[];
  refreshData: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    heroProduct: {
      id: 'hero-1',
      title: 'Handcrafted Coconut Bowl Set',
      description: 'Transform your dining experience with our beautifully handcrafted coconut bowls.',
      image: 'https://images.pexels.com/photos/6542652/pexels-photo-6542652.jpeg?auto=compress&cs=tinysrgb&w=1200
        ',
      ctaText: 'Shop Coconut Bowls',
      ctaLink: '/products?collection=Bowls & Tableware',
      price: 45.99
    },
    brandName: 'CocoManthra',
    tagline: 'Sustainable Handmade Coconut Products'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to validate hero product data
  const validateHeroProduct = (data: any): HeroProduct | null => {
    try {
      if (!data || typeof data !== 'object') {
        console.warn('Invalid hero product data: not an object', data);
        return null;
      }

      const requiredFields = ['id', 'title', 'description', 'image', 'ctaText', 'ctaLink', 'price'];
      const missingFields = requiredFields.filter(field => !(field in data));
      
      if (missingFields.length > 0) {
        console.warn('Invalid hero product data: missing required fields', missingFields, data);
        return null;
      }

      // Validate types
      if (typeof data.id !== 'string' || 
          typeof data.title !== 'string' || 
          typeof data.description !== 'string' || 
          typeof data.image !== 'string' || 
          typeof data.ctaText !== 'string' || 
          typeof data.ctaLink !== 'string' || 
          typeof data.price !== 'number') {
        console.warn('Invalid hero product data: incorrect field types', data);
        return null;
      }

      return data as HeroProduct;
    } catch (err) {
      console.error('Error validating hero product:', err);
      return null;
    }
  };

  // Helper function to validate brand settings data
  const validateBrandSettings = (data: any): { brandName: string; tagline: string } | null => {
    try {
      if (!data || typeof data !== 'object') {
        console.warn('Invalid brand settings data: not an object', data);
        return null;
      }

      if (typeof data.brandName !== 'string' || typeof data.tagline !== 'string') {
        console.warn('Invalid brand settings data: incorrect field types', data);
        return null;
      }

      return {
        brandName: data.brandName,
        tagline: data.tagline
      };
    } catch (err) {
      console.error('Error validating brand settings:', err);
      return null;
    }
  };

  // Convert database row to Product type
  const dbProductToProduct = (dbProduct: any, collections: Collection[]): Product => {
    try {
      const collection = collections.find(c => c.id === dbProduct.collection_id);
      return {
        id: dbProduct.id,
        name: dbProduct.name || '',
        price: dbProduct.price || 0,
        description: dbProduct.description || '',
        image: dbProduct.image || '',
        collection: collection?.name || 'Unknown',
        featured: dbProduct.featured || false,
        createdAt: dbProduct.created_at,
      };
    } catch (err) {
      console.error('Error converting database product:', err);
      throw err;
    }
  };

  // Convert database row to Collection type
  const dbCollectionToCollection = (dbCollection: any): Collection => {
    try {
      return {
        id: dbCollection.id,
        name: dbCollection.name || '',
        description: dbCollection.description || '',
        image: dbCollection.image || '',
        createdAt: dbCollection.created_at,
      };
    } catch (err) {
      console.error('Error converting database collection:', err);
      throw err;
    }
  };

  // Load data from Supabase
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load collections first
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('collections')
        .select('*')
        .order('name');

      if (collectionsError) {
        console.error('Collections error:', collectionsError);
        throw collectionsError;
      }

      const collectionsFormatted = (collectionsData || []).map(dbCollectionToCollection);
      setCollections(collectionsFormatted);

      // Load products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) {
        console.error('Products error:', productsError);
        throw productsError;
      }

      const productsFormatted = (productsData || []).map(p => dbProductToProduct(p, collectionsFormatted));
      setProducts(productsFormatted);

      // Load site settings with proper validation
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*');

      if (settingsError) {
        console.error('Settings error:', settingsError);
        // Don't throw here, just log the error and continue with default settings
      } else if (settingsData && settingsData.length > 0) {
        const heroProductSetting = settingsData.find(s => s.key === 'hero_product');
        const brandSetting = settingsData.find(s => s.key === 'brand_settings');

        setSiteSettings(prev => {
          const newSettings = { ...prev };

          // Validate and update hero product
          if (heroProductSetting?.value) {
            const validatedHeroProduct = validateHeroProduct(heroProductSetting.value);
            if (validatedHeroProduct) {
              newSettings.heroProduct = validatedHeroProduct;
            }
          }

          // Validate and update brand settings
          if (brandSetting?.value) {
            const validatedBrandSettings = validateBrandSettings(brandSetting.value);
            if (validatedBrandSettings) {
              newSettings.brandName = validatedBrandSettings.brandName;
              newSettings.tagline = validatedBrandSettings.tagline;
            }
          }

          return newSettings;
        });
      }

    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Initialize data and real-time subscriptions
  useEffect(() => {
    let mounted = true;
    let subscriptions: any[] = [];

    const initializeData = async () => {
      try {
        await loadData();
        
        if (!mounted) return;

        // Only set up subscriptions if data loaded successfully
        try {
          setupBuildTriggers();

          // Set up real-time subscriptions for UI updates
          const productsSubscription = supabase
            .channel('products-ui-updates')
            .on('postgres_changes', 
              { event: '*', schema: 'public', table: 'products' },
              () => {
                if (mounted) {
                  loadData();
                }
              }
            )
            .subscribe();

          const collectionsSubscription = supabase
            .channel('collections-ui-updates')
            .on('postgres_changes',
              { event: '*', schema: 'public', table: 'collections' },
              () => {
                if (mounted) {
                  loadData();
                }
              }
            )
            .subscribe();

          const settingsSubscription = supabase
            .channel('settings-ui-updates')
            .on('postgres_changes',
              { event: '*', schema: 'public', table: 'site_settings' },
              () => {
                if (mounted) {
                  loadData();
                }
              }
            )
            .subscribe();

          subscriptions = [productsSubscription, collectionsSubscription, settingsSubscription];
        } catch (subscriptionError) {
          console.error('Error setting up subscriptions:', subscriptionError);
          // Continue without real-time updates if subscriptions fail
        }
      } catch (initError) {
        console.error('Error initializing data:', initError);
        if (mounted) {
          setError(initError instanceof Error ? initError.message : 'Failed to initialize application');
          setLoading(false);
        }
      }
    };

    initializeData();

    return () => {
      mounted = false;
      subscriptions.forEach(subscription => {
        try {
          subscription?.unsubscribe();
        } catch (err) {
          console.error('Error unsubscribing:', err);
        }
      });
    };
  }, []);

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      const collection = collections.find(c => c.name === productData.collection);
      if (!collection) throw new Error('Collection not found');

      const { error } = await supabase
        .from('products')
        .insert({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          image: productData.image,
          collection_id: collection.id,
          featured: productData.featured,
        });

      if (error) throw error;
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const updateData: any = {};
      
      if (productData.name !== undefined) updateData.name = productData.name;
      if (productData.price !== undefined) updateData.price = productData.price;
      if (productData.description !== undefined) updateData.description = productData.description;
      if (productData.image !== undefined) updateData.image = productData.image;
      if (productData.featured !== undefined) updateData.featured = productData.featured;
      
      if (productData.collection !== undefined) {
        const collection = collections.find(c => c.name === productData.collection);
        if (!collection) throw new Error('Collection not found');
        updateData.collection_id = collection.id;
      }

      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  const addCollection = async (collectionData: Omit<Collection, 'id' | 'createdAt'>) => {
    try {
      const { error } = await supabase
        .from('collections')
        .insert({
          name: collectionData.name,
          description: collectionData.description,
          image: collectionData.image,
        });

      if (error) throw error;
    } catch (err) {
      console.error('Error adding collection:', err);
      throw err;
    }
  };

  const updateCollection = async (id: string, collectionData: Partial<Collection>) => {
    try {
      const updateData: any = {};
      if (collectionData.name !== undefined) updateData.name = collectionData.name;
      if (collectionData.description !== undefined) updateData.description = collectionData.description;
      if (collectionData.image !== undefined) updateData.image = collectionData.image;

      const { error } = await supabase
        .from('collections')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating collection:', err);
      throw err;
    }
  };

  const deleteCollection = async (id: string) => {
    try {
      // Products will be deleted automatically due to CASCADE
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting collection:', err);
      throw err;
    }
  };

  const updateHeroProduct = async (heroProduct: Partial<HeroProduct>) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'hero_product',
          value: heroProduct,
        }, { onConflict: 'key' });

      if (error) throw error;
    } catch (err) {
      console.error('Error updating hero product:', err);
      throw err;
    }
  };

  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    try {
      if (settings.brandName || settings.tagline) {
        const { error } = await supabase
          .from('site_settings')
          .upsert({
            key: 'brand_settings',
            value: {
              brandName: settings.brandName || siteSettings.brandName,
              tagline: settings.tagline || siteSettings.tagline,
            },
          });

        if (error) throw error;
      }
    } catch (err) {
      console.error('Error updating site settings:', err);
      throw err;
    }
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getCollectionById = (id: string) => {
    return collections.find(collection => collection.id === id);
  };

  const getProductsByCollection = (collection: string) => {
    if (collection === 'all') return products;
    return products.filter(product => 
      product.collection.toLowerCase() === collection.toLowerCase()
    );
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const searchProducts = (query: string) => {
    if (!query.trim()) return products;
    
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.collection.toLowerCase().includes(lowercaseQuery)
    );
  };

  const refreshData = async () => {
    await loadData();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        collections,
        siteSettings,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        addCollection,
        updateCollection,
        deleteCollection,
        updateHeroProduct,
        updateSiteSettings,
        getProductById,
        getCollectionById,
        getProductsByCollection,
        getFeaturedProducts,
        searchProducts,
        refreshData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};