import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        setError('Failed to load recipe. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading recipe...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!recipe) {
    return <p className="text-center text-gray-500">Recipe not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600"
      >
        Go Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <p className="text-lg text-gray-700 mb-6">{recipe.description}</p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-6">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Preparation Steps</h2>
        <ol className="list-decimal pl-6">
          {recipe.steps.map((step, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Difficulty Level</h2>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
          {recipe.difficulty}
        </span>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Last Updated</h2>
        <p className="text-gray-500">{new Date(recipe.lastUpdated).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
