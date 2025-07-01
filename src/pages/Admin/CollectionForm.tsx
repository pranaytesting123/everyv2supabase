import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import ImageUpload from '../../components/Admin/ImageUpload';

interface CollectionFormProps {
  collectionId?: string | null;
  onClose: () => void;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ collectionId, onClose }) => {
  const { addCollection, updateCollection, getCollectionById } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!collectionId;
  const existingCollection = isEditing ? getCollectionById(collectionId) : null;

  useEffect(() => {
    if (existingCollection) {
      setFormData({
        name: existingCollection.name,
        description: existingCollection.description,
        image: existingCollection.image,
      });
    }
  }, [existingCollection]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Collection name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim()) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const collectionData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        image: formData.image.trim(),
      };

      if (isEditing && collectionId) {
        await updateCollection(collectionId, collectionData);
      } else {
        await addCollection(collectionData);
      }

      onClose();
    } catch (error) {
      console.error('Error saving collection:', error);
      alert('Failed to save collection. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image: imageUrl }));
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Edit Collection' : 'Add New Collection'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={submitting}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter collection name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <ImageUpload
            value={formData.image}
            onChange={handleImageChange}
            label="Collection Image"
            error={errors.image}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              disabled={submitting}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter collection description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : (isEditing ? 'Update Collection' : 'Add Collection')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionForm;