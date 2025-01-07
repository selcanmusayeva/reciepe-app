import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import { FiPlus, FiX } from 'react-icons/fi';

const EditRecipeModal = ({ open, onClose, recipe, onUpdate }) => {
  const [editedRecipe, setEditedRecipe] = useState({ ...recipe });
  const [newIngredient, setNewIngredient] = useState('');
  const [newStep, setNewStep] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({ ...editedRecipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecipe = {
      ...editedRecipe,
      lastUpdated: new Date().toISOString()
    };
    onUpdate(updatedRecipe);
    onClose();
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setEditedRecipe({
        ...editedRecipe,
        ingredients: [...editedRecipe.ingredients, newIngredient.trim()]
      });
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = editedRecipe.ingredients.filter((_, i) => i !== index);
    setEditedRecipe({ ...editedRecipe, ingredients: updatedIngredients });
  };

  const handleAddStep = () => {
    if (newStep.trim()) {
      setEditedRecipe({
        ...editedRecipe,
        steps: [...editedRecipe.steps, newStep.trim()]
      });
      setNewStep('');
    }
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = editedRecipe.steps.filter((_, i) => i !== index);
    setEditedRecipe({ ...editedRecipe, steps: updatedSteps });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editedRecipe.tags?.includes(newTag.trim())) {
      setEditedRecipe({
        ...editedRecipe,
        tags: [...(editedRecipe.tags || []), newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = editedRecipe.tags.filter(tag => tag !== tagToRemove);
    setEditedRecipe({ ...editedRecipe, tags: updatedTags });
  };

  const handleKeyPress = (e, handler) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handler();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl max-h-[90vh] overflow-auto bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={editedRecipe.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={editedRecipe.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={editedRecipe.difficulty}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Ingredients Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddIngredient)}
                  placeholder="Add ingredient"
                  className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <FiPlus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editedRecipe.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {ingredient}
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <FiX size={16} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Steps Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Steps
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newStep}
                  onChange={(e) => setNewStep(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddStep)}
                  placeholder="Add step"
                  className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <FiPlus size={20} />
                </button>
              </div>
              <div className="space-y-2">
                {editedRecipe.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm font-medium w-6">{index + 1}.</span>
                    <p className="flex-1 text-sm">{step}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(index)}
                      className="text-gray-500 hover:text-red-500 p-1"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
                  placeholder="Add tag"
                  className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <FiPlus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editedRecipe.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <FiX size={16} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default EditRecipeModal;
